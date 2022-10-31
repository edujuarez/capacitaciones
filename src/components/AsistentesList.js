import React from "react";
import { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom'
import './styles/asistentesList.css';
import { AiOutlinePlusCircle } from 'react-icons/ai';




<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100;300&display=swap');
</style> 

function AsistentesList() {
    const [asistentes, setAsistentes] = useState([]);
    useEffect(() => {
        fetch("https://capacitacionesiselin.herokuapp.com/asistente")
        .then(res => {
            return res.json();
        })
        .then(data => {
            setAsistentes(data);
        })
    }, []);

    return (
        <React.Fragment>
            <div className='containerAsistente'>
                <div className='title'>
                    <h1>Asistentes</h1>
                </div>
                <div className='card'>
                    <h1>Legajo</h1>
                    <h1>Nombre</h1>
                    <h1>Sector</h1>
                    <h1>Cargo</h1>
                    <h1>DNI</h1>

                </div>
                {asistentes.map((asistentes) => (
               
                    <Link to={`/asistentes/${asistentes.idasistente}`} key={asistentes.idasistente}>
                        <div className='card' >
                            <div className='column'>
                                <p>{asistentes.legajo}</p>
                            </div>
                            <div className='column'>
                                <p>{asistentes.nombre}</p>
                            </div>
                            <div className='column'>
                                <p>{asistentes.sector}</p>
                            </div>
                            <div className='column'>
                                <p>{asistentes.cargo}</p>
                            </div>
                            <div className='column'>
                                <p>{asistentes.dni}</p>                        
                            </div>              
                        </div>
                        </Link>
                      
                ))}
                <div className='buttonContainer'>
                    <a className='addButton' href='/nuevoasistente'>
                        <AiOutlinePlusCircle className='addIcon' />
                        <p>Agregar asistente</p>
                    </a>
                </div>
            </div>
        
        </React.Fragment> 
        )
    }
export default AsistentesList;