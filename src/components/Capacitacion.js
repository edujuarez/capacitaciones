import React from 'react';
import { useState, useEffect, } from 'react';
import { Link } from 'react-router-dom'
import './styles/Capacitacion.css';
import { IoEyeOutline } from 'react-icons/io5';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import moment from 'moment';
import 'moment/locale/es';


function Capacitacion() {
    const [capacitaciones, setCapacitaciones] = useState([]);
    //maneja busqueda de capacitacion especifica
    const [searchTerms, setSearchTerms] = useState("");

    useEffect(() => {
        let url = "https://servercapacitaciones-production.up.railway.app/capacitaciones";
        fetch(url)
            .then(res => {
                return res.json();
            })
            .then(data => {/*
                data.map((elem) => {
                    elem.fecha = (elem.fecha).toString() +'+02:00'
                  return elem.fecha
                })*/
                console.log(data)
                data.sort(function (a, b) { return a.nombre + b.nombre })
                setCapacitaciones(data.reverse());
            })

    }, []);
    return (
        <React.Fragment>
            <div className='mainContainer'>
                {capacitaciones &&
                    <h1 className='mainTittle'>Proximas Capacitaciones</h1>}
                <div className="title">
                    <input type="text"
                        placeholder="Buscar capacitación"
                        onChange={(e) => {
                            setSearchTerms(e.target.value);
                        }} />
                    <div className='buttonContainer'>
                        <a className='addButton' href='/nuevaCapacitacion'>
                            <AiOutlinePlusCircle className='addIcon' />
                            <p>Agregar capacitación</p>
                        </a>
                    </div>
                </div>
                {capacitaciones.filter((capacitaciones) => {
                    if (searchTerms == "") {
                        return capacitaciones
                    } else if (capacitaciones.nombre.toLowerCase().includes(searchTerms.toLowerCase())) {
                        return capacitaciones
                    }
                })
                    .map((capacitaciones) => (
                        <Link to={`/capacitaciones/${capacitaciones.idcapacitacion}`} key={capacitaciones.idcapacitacion}>
                            <div className='card'>
                                <div className='dateContainer'>
                                    <p> {moment(capacitaciones.fecha).format('L')} </p>
                                </div>
                                <div className='nameContainer'>
                                    <p> {capacitaciones.nombre} </p>
                                </div>
                                <div className='viewContainer' href='/capacitacionview'>
                                    <IoEyeOutline className='editButton' />
                                </div>
                            </div>
                        </Link>

                    ))
                }
            </div>
        </React.Fragment>

    )
}
export default Capacitacion;