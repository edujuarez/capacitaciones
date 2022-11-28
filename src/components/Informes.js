import { React } from 'react';
import './styles/informes.css';
import { useState, Fragment, useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { BsSearch } from 'react-icons/bs';
import moment from 'moment';
import 'moment/locale/es';



function Informes() {
    moment.locale('es')
    //Inicializo states de busqueda
    const [busqueda, setBusqueda] = useState([]);
    const [searchTerms, setSearchTerms] = useState("");

    //fetcheamos TODOS los asistentes y capacitaciones y ordenamos por fecha
    useEffect(() => {
        fetch("https://servercapacitaciones-production.up.railway.app/asistentes")
        .then(res => {
            return res.json();
        })
        .then(data => {
            data.map((elem) => {
              return elem.fecha = moment(elem.fecha).format('L')
            })
            data.sort(function (a, b) { return a.fecha - b.fecha })
            setBusqueda(data);
    }, [])});
    
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

        //configura el boton de imprimir para guardar PDF
        const componentRef = useRef();
        const handlePrint = useReactToPrint({
            content: () => componentRef.current,
        });

        //date format
        let [fechaHasta, setFechaHasta] = useState("");
        function formatDateHasta(date) {
                if(date == ""){
                    return setFechaDesde("")
                }
                console.log("HASTA " + moment(date).format('L'))
                let newDate = new Date(`${date}T00:00:00`)

                return  setFechaHasta(newDate.toLocaleDateString())
              }

        let [fechaDesde, setFechaDesde] = useState("");
        function formatDateDesde(date) {
            if(date == ""){
                return setFechaDesde("")
            }
            console.log("DESDE " + moment(date).format('L'))
            let newDate2 = new Date(`${date}T00:00:00`)

            return setFechaDesde (newDate2.toLocaleDateString())
        } 
        
        const handleSearch = () => {
            console.log(fechaDesde)
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
            console.log(busqueda)
        }
    return(
        <Fragment>
            <div className='containerInformes'>
                <div className='tittleSectionInformes'>
                    <div className='tittleInformes'>
                        <h1>Buscar asistente</h1>
                        <input
                            className='inputInformes'
                            type="text"
                            placeholder="Ingrese capacitación o asistente a buscar"
                            onChange={(e) => {
                                setSearchTerms(e.target.value)
                            }}
                        />
                    </div>
                        <div className='tittleInformes'>
                            <h1>Desde</h1>
                            <input 
                                className='inputInformes'
                                type="date"
                                onChange={(e)=> {formatDateDesde(e.target.value)}}                            
                                />
                        </div>                    
                        <div className='tittleInformes'>
                            <h1>Hasta</h1>
                            <input
                                className='inputInformes'
                                type="date"
                                onChange={(e)=> {formatDateHasta(e.target.value)}}
                                
                                />                               
                        </div>
                        <button className='buttonSearch' type="" onClick={handleSearch}>
                            <BsSearch /> Buscar
                        </button>
                </div>
                   
                <section ref={componentRef}>
                    <div className='tittleSection'>
                        <h1>Informe de capacitaciones</h1>
                    </div>
                    <table border="2">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Capacitación</th>
                                <th>Apellido y nombre</th>
                                <th>Asistió</th>
                                <th>Nota</th>
                                <th>Porcentaje</th>
                            </tr>
                        </thead>
                        <tbody>
                            {busqueda.filter((val) => {
                                if(searchTerms == "") {
                                    return val
                                } else if (val.nombre.toLowerCase().includes(searchTerms.toLowerCase()) || val.nombreCapacitacion.toLowerCase().includes(searchTerms.toLowerCase()))   
                                {
                                    return val 
                                }
                            }).map((val) => {
                                return (
                                    <tr key={val.id}>
                                        <td>{moment(val.fecha).format('L')} </td>
                                        <td>{val.nombreCapacitacion}</td>
                                        <td>{val.nombre}</td>
                                        <td>{val.asistencia=="1" ? "Si": "No"}</td>
                                        <td>{val.puntaje}</td>
                                        <td>{val.porcentaje}%</td>
                                    </tr>
                                    
                                )})}             
                        </tbody>
                    </table>
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