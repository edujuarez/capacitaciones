import React from 'react';
import { useState, Fragment, useEffect,  } from 'react';
import { Link } from 'react-router-dom'
import './styles/Capacitacion.css';
import { IoEyeOutline } from 'react-icons/io5';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import moment from 'moment';

function Capacitacion() {
    moment.locale('es')
    const  [capacitaciones, setCapacitaciones ] = useState([]);
    useEffect(() => {
        let url = "https://servercapacitaciones-production.up.railway.app/capacitaciones";
        fetch(url)
        .then(res => {
            return res.json();
        })
        .then(data => {
                data.map((elem) => {
                  return elem.fecha = new Date(elem.fecha)
                })
                data.sort(function (a, b) { return a.fecha - b.fecha })
            setCapacitaciones(data);
        })
    }, []);

        return (
        <React.Fragment>
            <div className='mainContainer'>
                {capacitaciones && <h1 className='mainTittle'>Proximas Capacitaciones</h1>}

                     {capacitaciones.map((capacitaciones) => (
                          <Link to={`/capacitaciones/${capacitaciones.idcapacitacion}`} key={ capacitaciones.idcapacitacion}>
                            <div className='card'>
                                    <div className='dateContainer'>
                                        <p> {moment(capacitaciones.fecha).format('L')} </p>
                                    </div>
                                    <div className='nameContainer'>
                                        <p> { capacitaciones.nombre } </p>
                                    </div>
                                    <div className='' href='/capacitacionview'>
                                        <IoEyeOutline className='editButton' />
                                    </div>
                            </div>
                        </Link>
                       
                     ))
                     }
                    
                <div className='buttonContainer'>
                    <a className='addButton' href='/nuevaCapacitacion'>
                        <AiOutlinePlusCircle className='addIcon' />
                        <p>Agregar capacitación</p>
                    </a>
                </div>
            </div>
        </React.Fragment>
           
        )
    }
export default Capacitacion;