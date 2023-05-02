import React from 'react';
import './styles/historial.css';
import { useState, Fragment, useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { BsSearch, BsTrash } from 'react-icons/bs';
import moment from 'moment';
import 'moment/locale/es';
import logoIselin from '../images/iselin.jpg';
import ExportToExcel from './ExportToExcel';
import Multiselect from 'multiselect-react-dropdown';

function Historial() {
    moment.locale('es')
    //Inicializo states de busqueda
    const [asistentes, setAsistentes] = useState([]);
    const [historial, setHistorial] = useState([]);
    const [selected, setSelected] = useState([]);

    //fetcheamos TODOS los asistentes y capacitaciones y ordenamos por fecha
    useEffect(() => {
        fetch("https://servercapacitaciones-production.up.railway.app/asistentes")
            .then(res => {
                return res.json();
            })
            .then(data => {
                data.sort(function (a, b) { return a.nombre - b.nombre })
                setAsistentes(data);
            })
    }, []);

    //fetcheamos todos las  asistencias
    useEffect(() => {
        fetch(`https://servercapacitaciones-production.up.railway.app/asistencia`)
            .then(res => {
                return res.json();
            })
            .then(data => {
                //lo paso por un set para eliminar duplicados
                const dataArr = new Set(data);
                let result = [...dataArr]
                setHistorial(result);
            })
    }, []);

    //configura el boton de imprimir para guardar PDF, imprime el componente referente
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const formulario = (id) => {
        //vacio el array de capacitaciones para que no se repitan
        setSelected([''])
        //busco en el array de asistencias las que coincidan con el ID del asistente seleccionado
        setSelected(historial.filter(asistentes => asistentes.invitadoID == id))
    }

    //enviamos el usuario seleccionado al formulario
    function onSelect(e) {
        formulario(e[0].invitadoID)
    }

    // Crear estados de fecha
    const [fechaDesde, setFechaDesde] = useState("");
    const [fechaHasta, setFechaHasta] = useState("");

    // Crear manejadores de eventos para fechas
    function handleFechaDesdeChange(e) {
        setFechaDesde(e.target.value);
    }

    function handleFechaHastaChange(e) {
        setFechaHasta(e.target.value);
    }

    // Crear manejador de evento para búsqueda
    function handleSearch() {
        if (fechaDesde && fechaHasta) {
            const fechaDesdeTimestamp = new Date(fechaDesde).getTime();
            const fechaHastaTimestamp = new Date(fechaHasta).getTime();
            //convierto la fecha string del elemento a mm/dd/aaaa para comparar
            const filtered = selected.filter((element) => {
                const parts = element.fecha.split("/");
                const timestamp = new Date(parts[2], parts[1] - 1, parts[0]);
                return timestamp >= fechaDesdeTimestamp && timestamp <= fechaHastaTimestamp;
            });
            setSelected(filtered);
        }
    }
    //button that eliminate the filters
    function deleteFilters() {
        formulario([""]);
        setFechaDesde("");
        setFechaHasta("");
    }
    return (
        <Fragment>
            <div className='containerInformes'>
                <div className='tittleSectionInformes'>
                    <div className='tittleInformes'>
                        <h1>Buscar historial de capacitaciones</h1>

                        <Multiselect
                            options={asistentes} // Options to display in the dropdown
                            placeholder="Ingrese asistente a buscar. Maximo permitido 1." // Property name to display in the dropdown options
                            isObject={true}
                            onSelect={onSelect}
                            displayValue="nombre"
                            selectionLimit={1}
                            showArrow
                        />
                    </div>
                </div>
                <div className='searchBoxHistorial'>
                    <div className='historialBusqueda'>
                        <h2>Desde</h2>
                        <input
                            type="date"
                            value={fechaDesde}
                            onChange={handleFechaDesdeChange}
                        />
                    </div>
                    <div className='historialBusqueda'>
                        <h2>Hasta</h2>
                        <input
                            type="date"
                            value={fechaHasta}
                            onChange={handleFechaHastaChange}
                        />
                    </div>
                </div>
                <div className='buttonHistorialSection'>
                    <button classname='buttonSearchDate' onClick={handleSearch}><BsSearch /></button>
                    <button className='buttonDeleteFilter' onClick={deleteFilters}> <BsTrash /></button>

                </div>
                <section ref={componentRef}>
                    {selected.length > 0 ? (
                        <>
                            <table border="1" bordercolor="white">
                                <thead>
                                    <tr className='primerTitulo'>
                                        <th>SGI</th>
                                        <th>CÓDIGO</th>
                                        <th>TÍTULO</th>
                                        <th>PROCESO</th>
                                        <th>REV</th>
                                    </tr>
                                    <tr className='segundoTitulo'>
                                        <th><img src={logoIselin}></img></th>
                                        <th>RG-RH 06-12</th>
                                        <th>HISTORIAL DE CAPACITACIONES</th>
                                        <th>GESTIÓN DEL RECURSO HUMANO</th>
                                        <th>0</th>
                                    </tr>
                                    <tr className='segundoTitulo'>
                                        <th>Apellido y nombre:</th>
                                        <th colSpan="2">{selected[0].nombre}</th>
                                        <th>Legajo: {selected[0].invitadoID}</th>
                                        <th></th>
                                    </tr>
                                    <tr>
                                        <th>Fecha desde:</th>
                                        <th>{fechaDesde ? moment(fechaDesde).format('L') : ""}</th>
                                        <th>Fecha hasta:</th>
                                        <th>{fechaHasta ? moment(fechaHasta).format('L') : ""}</th>
                                        <th></th>
                                    </tr>
                                </thead>
                            </table>
                            <table border="1">
                                <thead >
                                    <tr >
                                        <th>ID</th>
                                        <th>Fecha</th>
                                        <th>Asistió</th>
                                        <th>Nombre capacitación</th>
                                        <th>Evaluación</th>
                                        <th>% de aprobación</th>
                                    </tr>
                                </thead>

                                <tbody >
                                    {selected.map((val, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{val.capacitacionID}</td>
                                                <td>{val.fecha}</td>
                                                <td>{val.asistencia == "1" ? "Si" : "No"}</td>
                                                <td>{val.nombreCapacitacion}</td>
                                                <td>{val.puntaje}</td>
                                                <td>{val.porcentaje ? val.porcentaje + " %" : "Sin cargar"}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </>
                    ) : (
                        <p></p>
                    )}</section>

                {selected.length > 0 ?
                    <div className="buttonSection">
                        <button
                            className="printButton"
                            onClick={handlePrint}>
                            Imprimir informe
                        </button>
                        <ExportToExcel excelData={selected} fileName={`Historial ` + selected[0].nombre} />
                    </div>
                    :
                    <>
                    </>
                }
            </div>
        </Fragment >

    )
}
export default Historial;