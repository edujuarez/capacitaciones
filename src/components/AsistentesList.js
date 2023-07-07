import React from "react";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import './styles/asistentesList.css';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { IoEyeOutline } from 'react-icons/io5';


function AsistentesList() {
    const [asistentes, setAsistentes] = useState([]);
    const [searchTerms, setSearchTerms] = useState("");

    useEffect(() => {
        fetch("https://servercapacitaciones-production.up.railway.app/asistente")
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

                <h1 className='mainTittle_asistentes'>Asistentes</h1>
                <div className='title'>
                    <input type="text"
                        placeholder="Buscar asistente"
                        onChange={(e) => {
                            setSearchTerms(e.target.value);
                        }} />
                    <div className='buttonContainer'>
                        <a className='addButton' href='/nuevoasistente'>
                            <AiOutlinePlusCircle className='addIcon' />
                            <p>Agregar nuevo</p>
                        </a>
                    </div>
                </div>
                <div className='card'>
                    <h1>Legajo</h1>
                    <h1>Nombre</h1>
                    <h1>Sector</h1>
                    <h1>Detalles</h1>
                </div>
                {asistentes.filter((asistentes) => {
                    if (searchTerms === "") {
                        return asistentes
                    } else if (asistentes.nombre.toLowerCase().includes(searchTerms.toLowerCase())) {
                        return asistentes
                    }
                })
                    .map((asistentes) => (

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
                                    <IoEyeOutline />
                                </div>
                            </div>
                        </Link>

                    ))}

            </div>

        </React.Fragment >
    )
}
export default AsistentesList;