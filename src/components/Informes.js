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

    
    const  [capacitaciones, setCapacitaciones ] = useState([]);
    useEffect(() => {
        let url = "https://servercapacitaciones-production.up.railway.app/capacitaciones";
        fetch(url)
        .then(res => {
            return res.json();
        })
        .then(data => {
            setCapacitaciones(capacitaciones);
        })
    }, []);

        //configura el boton de imprimir para guardar PDF
        const componentRef = useRef();
        const handlePrint = useReactToPrint({
            content: () => componentRef.current,
        });


        function handleFilterClick() {
            console.log('desde ' + startDate + ' hasta ' + endDate )
            let filteredData = capacitaciones.filter(item => {
              const itemDate = moment(item.fecha).format('L');
              return itemDate >= startDate && itemDate <= endDate;
            })
            setFilteredData(filteredData);
          }
        console.log(filteredData)
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
                        <input
                            className='inputInformes'
                            type="text"
                            placeholder="Ingrese nombre de capacitación"
                            onChange={(e) => {
                                setSearchTerms(e.target.value)
                            }}
                        />
                    </div>
                </div>
                <div className='searchBox'>
                    <div className='tittleInformes'>
                            <h2>Desde</h2>
                            <input 
                                className='inputInformes'
                                type="date"
                                onChange={handleStartDateChange}                            
                                />
                        </div>                    
                        <div className='tittleInformes'>
                            <h2>Hasta</h2>
                            <input
                                className='inputInformes'
                                type="date"
                                onChange={handleEndDateChange}
                                
                                />                               
                        </div>
                </div>
                    
                        <button className='buttonSearch' type="" onClick={handleFilterClick}>
                            <BsSearch /> Buscar
                        </button>
                
                
                   
                <section ref={componentRef}>
                    <div className='tittleSection'>
                        <h1>Informe de capacitaciones</h1>
                    </div>
                    {filteredData.length > 0 ? (
                    <table border="1">
                        <thead>
                            <tr>
                                <th>Legajo</th>
                                <th>Nombre capacitación</th>
                                <th>Apellido y nombre</th>
                                <th>Asistió</th>
                                <th>Nota</th>
                                <th>Porcentaje</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map(val => (
                                    <tr key={val.id}>
                                    <td>{val.fecha}</td>
                                    <td>{val.nombreCapacitacion}</td>
                                    <td>{val.nombre}</td>
                                    <td>{val.asistencia=="1" ? "Si": "No"}</td>
                                    <td>{val.puntaje}</td>
                                    <td>{val.porcentaje}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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