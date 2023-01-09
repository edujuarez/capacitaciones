import { React } from 'react';
import './styles/historial.css';
import { useState, Fragment, useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { BsSearch } from 'react-icons/bs';
import moment from 'moment';
import 'moment/locale/es';
import logoIselin from '../images/iselin.jpg';



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
            setAsistentes(data);
    })}, []);


    //fetcheamos todos las  asistencias
    useEffect(() => {
        fetch(`https://servercapacitaciones-production.up.railway.app/asistencia`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            setHistorial(data);
        })
    }, []);
    
    const  [capacitaciones, setCapacitaciones ] = useState([]);
    useEffect(() => {
        let url = "https://servercapacitaciones-production.up.railway.app/capacitaciones";
        fetch(url)
        .then(res => {
            return res.json();
        })
        .then(capacitaciones => {
            setCapacitaciones(capacitaciones);
        })
    }, []);

        //configura el boton de imprimir para guardar PDF, imprime el componente referente
        const componentRef = useRef();
        const handlePrint = useReactToPrint({
            content: () => componentRef.current,
        });

        //filtra solo la capacitacion que tiene ID a la seleccionada en el select
        
        /*
        function formulario (id){
            setHistorial(capacitaciones.filter(capacitaciones => capacitaciones.idcapacitacion == id))
            console.log("lo cargado en historial " + capacitaciones)

        }

        */
       const formulario = (id) =>
       {
        setSelected(historial.filter(asistentes => asistentes.invitadoID == id))        
        }



        //date format
        let [fechaHasta, setFechaHasta] = useState("");
        function formatDateHasta(date) {
                if(date == ""){
                    return setFechaDesde("")
                }
                console.log("HASTA " + moment(date).format('L'))
                let newDate = new Date(`${date}T05:00:00`)

                return  setFechaHasta(newDate.toLocaleDateString())
              }

        let [fechaDesde, setFechaDesde] = useState("");
        function formatDateDesde(date) {
            if(date == ""){
                return setFechaDesde("")
            }
            console.log("DESDE " + moment(date).format('L'))
            let newDate2 = new Date(`${date}T05:00:00`)

            return setFechaDesde (newDate2.toLocaleDateString())
        } 
        const handleSearch = () => {
            console.log(fechaDesde)
            if (fechaDesde !== "" && fechaHasta !== "" ){
                /*console.log("if adentro " + moment(fechaDesde).format('L') + " " + moment(fechaHasta).format('L'))
                setSelected(historial.filter(asistentes => (moment(asistentes.fecha).format('L') > fechaDesde || moment(asistentes.fecha).format('L') < fechaHasta)))
                console.log(selected)*/
            }
            else{
                console.log("if afuera")

                alert("Faltan datos de busqueda")
            }
        }
    return(
        <Fragment>
            <div className='containerInformes'>
                <div className='tittleSectionInformes'>
                    <div className='tittleInformes'>
                        <h1>Buscar historial de capacitaciones</h1>
                        <select name="select"
                            className='inputInformes'
                            type="text"
                            placeholder="Ingrese asistente a buscar"
                            onChange={(e) => {formulario(e.target.value)}}
                            >                     
                            <option>Ingrese nombre de personal</option>
                            {
                                asistentes.map((asistentes, index) => (
                                    <option key={index} value={asistentes.invitadoID}>{asistentes.nombre}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className='searchBox'>
                    <div className='tittleInformes'>
                            <h2>Desde</h2>
                            <input 
                                className='inputInformes'
                                type="date"
                                onChange={(e)=> {setFechaDesde(e.target.value)}}                            
                                />
                        </div>                    
                        <div className='tittleInformes'>
                            <h2>Hasta</h2>
                            <input
                                className='inputInformes'
                                type="date"
                                onChange={(e)=> {setFechaHasta(e.target.value)}}
                                
                                />                               
                        </div>
                        <button className='buttonSearch' type="" onClick={handleSearch}>
                            <BsSearch /> Buscar
                        </button>
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
                                <th>{fechaDesde ? moment(fechaDesde).format('L') : "" }</th>
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
                        {selected.map((val) => {
                                return (
                                    <tr key={val.invitadoID}>
                                        <td>{val.capacitacionID}</td>
                                        <td>{val.fecha }</td>
                                        <td>{val.asistencia=="1" ? "Si": "No"}</td>
                                        <td>{val.nombreCapacitacion}</td>
                                        <td>{val.puntaje}</td>
                                        <td>{val.porcentaje ? val.porcentaje + " %" : "Sin cargar" }</td>
                                    </tr>
                            )})}                
                        </tbody>
                    </table>
                </>
                ) : (
                    <p>No se encontraron coincidencias</p>
                    )}</section>
                
                
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
export default Historial;