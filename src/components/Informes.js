import React from 'react';
import './styles/informes.css';
import { useState, Fragment, useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { BsSearch } from 'react-icons/bs';
import moment from 'moment';
import 'moment/locale/es';
import logoIselin from '../images/iselin.jpg';
import Multiselect from 'multiselect-react-dropdown';
import { secondsToMilliseconds } from 'date-fns';
import ExportToExcel from './ExportToExcel';

function Informes() {
    moment.locale('es')
    //Inicializo states de busqueda
    const [selected, setSelected] = useState([]);
    const [asistentes, setAsistentes] = useState([]);


    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [filteredData, setFilteredData] = useState([]);

    function handleStartDateChange(event) {
        const formatDate = moment(event.target.value).format('L')
        setStartDate(formatDate);
    }

    function handleEndDateChange(event) {
        const formatDate = moment(event.target.value).format('L')
        setEndDate(formatDate);
    }

    //fetcheamos todas las capacitaciones para llenar el select
    const [capacitaciones, setCapacitaciones] = useState([]);
    useEffect(() => {
        let url = "https://servercapacitaciones-production.up.railway.app/capacitaciones";
        fetch(url)
            .then(res => {
                return res.json();
            })
            .then(data => {
                setCapacitaciones(data);
            })
    }, []);

    //fetcheamos todos las  asistencias
    useEffect(() => {
        fetch(`https://servercapacitaciones-production.up.railway.app/asistencia`)
            .then(res => {
                return res.json();
            })
            .then(data => {
                setAsistentes(data);
            })
    }, []);

    //configura el boton de imprimir para guardar PDF
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });


    function handleFilterClick() {/*
            console.log('desde ' + startDate + ' hasta ' + endDate )
            const filteredData = selected.filter(item => {
                return moment(item.fecha).format('L') >= startDate && moment(item.fecha).format('L') <= endDate;

            })
            setSelected(filteredData);*/
    }

    //llenamos el array select con los asistentes segun capacitacionID
    const formulario = (id) => {

        setSelected(asistentes.filter(asistentes => asistentes.capacitacionID == id))
        setFilteredData(capacitaciones.filter(capacitaciones => capacitaciones.idcapacitacion == id))
    }

    //multiselect configuracion
    function onSelect(e) {
        formulario(e[0].idcapacitacion)
    }
    return (
        <Fragment>
            <div className='containerInformes'>
                <div className='tittleSectionInformes'>
                    <div className='tittleInformes'>
                        <h1>Generar informe de asistencia</h1>
                        <Multiselect
                            options={capacitaciones} // Options to display in the dropdown
                            placeholder="Ingrese capacitación a buscar" // Property name to display in the dropdown options
                            isObject={true}
                            onSelect={onSelect}
                            displayValue="nombre"
                            showArrow
                        />
                    </div>
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
                                        <th>RG-RH 06-13</th>
                                        <th>INFORMES DE CAPACITACIÓN</th>
                                        <th>GESTIÓN DEL RECURSO HUMANO</th>
                                        <th>0</th>
                                    </tr>
                                    <tr className=''>
                                        <th>Nombre de la capacitación:</th>
                                        <th colSpan="2">{selected[0].nombreCapacitacion}</th>
                                        <th colSpan="2">ID: {selected[0].capacitacionID}</th>
                                    </tr>
                                    <tr>
                                        <th>Fecha: {selected[0].fecha}</th>
                                        <th></th>
                                        <th></th>
                                        <th>Capacitador: {filteredData[0].capacitador}</th>
                                        <th></th>
                                    </tr>
                                </thead>
                            </table>

                            <table border="1">
                                <thead >
                                    <tr >
                                        <th>Legajo</th>
                                        <th>Apellido y nombre</th>
                                        <th>Evaluación </th>
                                        <th>Nota</th>
                                        <th>% de aprobación</th>
                                    </tr>
                                </thead>
                                <tbody className='segundoTitulo'>
                                    {selected.map(val => (
                                        <tr key={val.invitadoID}>
                                            <td>{val.invitadoID}</td>
                                            <td>{val.nombre}</td>
                                            <td>{val.asistencia == "1" ? "Si" : "No"}</td>
                                            <td>{val.puntaje}</td>
                                            <td>{val.porcentaje ? "Sin cargar" : val.porcentaje} %</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </>
                    ) : (
                        <p>No se encontraron asistentes cargados</p>
                    )}
                </section>

                <div className="buttonSection">
                    <button
                        className="printButton"
                        onClick={handlePrint}>
                        Imprimir informe
                    </button>
                    <ExportToExcel excelData={selected} fileName={selected.length > 0 ? selected[0].nombreCapacitacion : 'Export data'} />
                </div>
            </div>
        </Fragment>

    )
}
export default Informes;