import React from 'react';
import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";

import './styles/asistentesView.css';


function NuevoAsistente () {
    const params = useParams();
    let idasistente = params.idasistente;

    const  [asistente, setAsistente ] = useState([]);
    useEffect(() => {
        let url = `http://localhost:3006/asistente/${idasistente}`;
        fetch(url)
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data);
            setAsistente(data);
        })
    }, []);
    
        return (
            <React.Fragment>
                <div className='container_asistenteView'>
                    <div className='mainTittle_asistenteView'>
                        <h1>Ficha Asistente </h1>
                        <h1><a type='submit' href='/asistentes'>Volver</a> </h1>
                    </div>
                    {asistente.map((asistente) => (
                    <form className='bodyAsistente_asistenteView' key={asistente.idasistente}>
                        <label>Nombre:</label>
                        <p className='campo'className='campo'  name='nombre' >{asistente.nombre}</p>
                        <label>Legajo:</label>
                        <p className='campo' name='legajo' >{asistente.legajo}</p>
                        <label>Tipo de documento:</label>
                        <p className='campo' name='tipodoc' >{asistente.tipodoc}</p>
                        <label>DNI:</label>
                        <p className='campo' name='dni' >{asistente.dni}</p>
                        <label>Cargo:</label>
                        <p className='campo' name='cargo' >{asistente.cargo}</p>
                        <label>Sector:</label>
                        <p className='campo' name='sector' >{asistente.sector}</p>
                        <label>Fecha de Ingreso:</label>
                        <p className='campo' name='fechaingreso' >{asistente.fechaingreso}</p>
                        <a type="submit" href={`/asistentes/${idasistente}/edit`}> Editar</a>
                    </form>
                ))}
                </div>
                  
            </React.Fragment>
        )}
    
export default NuevoAsistente;