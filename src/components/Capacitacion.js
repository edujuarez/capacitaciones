import React from 'react';
import { useState, Fragment, useEffect,  } from 'react';
import { Link } from 'react-router-dom'
import './styles/Capacitacion.css';
import { IoEyeOutline } from 'react-icons/io5';
import { AiOutlinePlusCircle } from 'react-icons/ai';


function Capacitacion() {

    const  [capacitaciones, setCapacitaciones ] = useState([]);
    useEffect(() => {
        let url = "https://capacitacionesiselin.herokuapp.com/capacitaciones";
        fetch(url)
        .then(res => {
            return res.json();
        })
        .then(data => {
            setCapacitaciones(data);
        })
    }, []);

        return (
        <React.Fragment>
            <div className='container'>
                {capacitaciones && <h1 className='mainTittle'>Proximas Capacitaciones</h1>}
                    {capacitaciones.map((capacitaciones) => (
                        <Link to={`/capacitaciones/${capacitaciones.idcapacitacion}`} key={ capacitaciones.idcapacitacion}>
                            <div className='card'>
                                    <div className='dateContainer'>
                                        <p> { capacitaciones.fecha } </p>
                                    </div>
                                    <div className='nameContainer'>
                                        <p> { capacitaciones.nombre } </p>
                                    </div>
                                    <div className='' href='/capacitacionview'>
                                        <IoEyeOutline className='editButton' />
                                    </div>
                            </div>
                        </Link>
                ))}
                    
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