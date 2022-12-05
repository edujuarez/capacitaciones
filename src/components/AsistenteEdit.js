import React from 'react';
import { useState, useEffect, Fragment } from "react";

import {axios} from 'axios';
import { useParams } from "react-router-dom";


import './styles/asistenteEdit.css';
import e from 'cors';


function AsistenteEdit () {
    const params = useParams();
    let idasistente = params.idasistente;

    const [asistente, setAsistente ] = useState({
        nombre : "",
        legajo : "",
        tipodoc : "",
        dni : "",
        cargo : "",
        sector : "",
        fechaingreso: new Date()
    })
    const handleChange = (event) => {
        // Obtener el valor del campo de formulario en el que se produjo el cambio
        const value = event.target.value;
    
        // Modificar el valor de la variable asistente mediante la función setAsistente
        setAsistente(value);
      };

    useEffect(() => {
        let url = `https://servercapacitaciones-production.up.railway.app/asistente/${idasistente}`;
        fetch(url)
        .then(res => res.json())        
        .then(data => setAsistente(data[0]))
    }, []);

    console.log(asistente)
    const updateAsistente = (idasistente) => {
        e.preventDefault();
        let updateURL = `https://servercapacitaciones-production.up.railway.app/asistente/${idasistente}/edit`;
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(asistente[0])
        };
        console.log(requestOptions.body)
        fetch(updateURL, requestOptions)
        .then((res) => {
            alert("Asistente modificado correctamente");
            window.location.href = `https://servercapacitaciones-production.up.railway.app/asistente/${idasistente}`;
        })
    }

    
        return (
            <React.Fragment>
                <div className='container_AsistenteEdit'>
                
                    <div className='tittle_AsistenteEdit'>
                        <h1>Editar Asistente </h1>
                        <h1><a type='submit' href='/asistentes'>Volver</a> </h1>
                    </div>
                    <form className='bodyAsistenteEdit'  type='submit'>
                        
                        <label>Nombre:</label>
                        <input  
                            type='text'  
                            name='nombre'
                            value={asistente.nombre}
                            onChange={handleChange}
                        />
                        
                        <label>Legajo:</label>
                        <input  type='text'  name='legajo' value={asistente.legajo} onChange={handleChange}/>
                        <label>Tipo de documento:</label>
                        <input  type='text'  name='tipodoc' value={asistente.tipodoc} onChange={handleChange}/>
                        <label>DNI:</label>
                        <input  type='text'  name='dni' value={asistente.dni}  onChange={handleChange}/>
                        <label>Cargo:</label>
                        <input  type='text'  name='cargo' value={asistente.cargo}  onChange={handleChange}/>
                        <label>Sector:</label>
                        <input  type='text'  name='sector' value={asistente.sector}  onChange={handleChange}/>
                        <label>Fecha de Ingreso:</label>
                        <input  type='date'  name='fechaingreso' value={asistente.fechaingreso} onChange={handleChange}/>
                        <button
                            onClick={(e)=> {updateAsistente(asistente.idasistente)}}
                            > 
                            Guardar
                        </button>
                    </form>

                </div>
            </React.Fragment>
        )}
    
export default AsistenteEdit;