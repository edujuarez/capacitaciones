import { React } from 'react';
import './styles/informes.css';
import { useState, Fragment, useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { BsSearch } from 'react-icons/bs';
import moment from 'moment';
import 'moment/locale/es';
import logoIselin from '../images/iselin.jpg';
import Multiselect from 'multiselect-react-dropdown';
import { secondsToMilliseconds } from 'date-fns';




function Informes() {
    moment.locale('es')
    //Inicializo states de busqueda
    const [busqueda, setBusqueda] = useState([]);
    const [searchTerms, setSearchTerms] = useState("");
    const [nombre, setNombre] = useState("");
    const [legajo, setLegajo] = useState("");
    const [fecha, setFecha] = useState("");
    const [selected, setSelected] = useState([]);
    const [asistentes, setAsistentes] = useState([]);
    const [selectedValues, setSelectedValues] = useState([]);



    const [startDate, setStartDate] = useState(new Date(Date));
    const [endDate, setEndDate] = useState(new Date(Date));
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
    const  [capacitaciones, setCapacitaciones ] = useState([]);
    useEffect(() => {
        let url = "https://servercapacitaciones-production.up.railway.app/capacitaciones";
        fetch(url)
        .then(res => {
            return res.json();
        })
        .then(data => {
            setCapacitaciones(data);
            console.log(capacitaciones)
        })
    }, []);
    console.log(capacitaciones)

        //fetcheamos todos las  asistencias
        useEffect(() => {
            fetch(`https://servercapacitaciones-production.up.railway.app/asistencia`)
            .then(res => {
                return res.json();
            })
            .then(data => {
                setAsistentes(data);
                console.log(asistentes)
            })
        }, []);

        //configura el boton de imprimir para guardar PDF
        const componentRef = useRef();
        const handlePrint = useReactToPrint({
            content: () => componentRef.current,
        });


        function handleFilterClick() {
            console.log('desde ' + startDate + ' hasta ' + endDate )
            const filteredData = selected.filter(item => {
                return moment(item.fecha).format('L') >= startDate && itemDate <= endDate;
            })
            setSelected(filteredData);
          }
        
        //llenamos el array select con los asistentes segun capacitacionID
       const formulario = (id) =>
        { 
         setSelected(asistentes.filter(asistentes => asistentes.capacitacionID == id))
         }
         console.log(fecha)

        const handleSearch = () => {
            /*console.log(fechaDesde)
            if (fechaDesde !== "" && fechaHasta !== "" ){
                console.log("if adentro " + fechaDesde)
                busqueda.filter(
                    function (a)
                    {
                        result = a.some(moment(a.fecha).format('L') == moment(fechaDesde).format('L'))
                        return console.log(result)
                    });
            }
            else{
                console.log("if afuera")

                alert("Faltan datos de busqueda")
            }
            console.log(busqueda)*/
        }
    return (
        <Fragment>
            <div className='containerInformes'>
                <div className='tittleSectionInformes'>
                    <div className='tittleInformes'>
                        <h1>Generar informe de asistencia</h1>
                        <select name="select"
                            className='inputInformes'
                            type="text"
                            placeholder="Ingrese capacitacion a buscar"
                            onChange={(e) => {formulario(e.target.value)}}
                            >                     
                            <option>Ingrese capacitacion a buscar</option>
                            {
                                capacitaciones.map((capacitaciones, index) => (
                                    <option key={index} value={capacitaciones.idcapacitacion}>{capacitaciones.nombre}</option>
                                ))
                            }
                        </select>
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
                                <th>Nombre de la capacitacion: </th>
                                <th>{nombre}</th>
                                <th></th>
                                <th>ID: {legajo}</th>
                                <th></th>
                            </tr>
                            <tr>
                                <th>Fecha: {fecha}</th>
                                <th></th>
                                <th></th>
                                <th></th>
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
                                    <td>{val.asistencia=="1" ? "Si": "No"}</td>
                                    <td>{val.puntaje}</td>
                                    <td>{val.porcentaje} %</td>
                                </tr>
                            ))}
                        </tbody>
                    </table></>
                    ) : (
                            <p>No se encontraron coincidencias</p>
                    )}              
                </section>
                
                <div className="buttonSection">
                    <button 
                        className="printButton" 
                        onClick={handlePrint}>
                        Imprimir informe
                        </button>
                </div>
            </div>
        </Fragment>

    )
}
export default Informes;