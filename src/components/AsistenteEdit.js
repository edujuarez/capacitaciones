import React from 'react';
import { useState, useEffect, Fragment } from "react";

import axios from 'axios';
import { useParams } from "react-router-dom";


import './styles/asistenteEdit.css';


function AsistenteEdit () {
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
                console.log(data.nombre);
                console.log(data.nombre)
                setAsistente(data);
            })
        }, []);
        console.log(`${asistente.nombre}`)
      const [value, setValue] = useState({ 
        nombre : "",
        legajo : "",
        tipodoc : "",
        dni : "",
        cargo : "",
        sector : "",
        fechaingreso : ""
    });
    
    const handleChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })
    }

    const baseURL = `http://localhost:3006/asistente/${idasistente}/edit`
    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        axios.put(baseURL,{
            nombre : `${value.nombre}`,
            legajo : `${value.legajo}`,
            tipodoc : `${value.tipodoc}`,
            dni : `${value.dni}`,
            cargo : `${value.cargo}`,
            sector : `${value.sector}`,
            fechaingreso : `${value.fechaingreso}`
        }).then (() => {
            alert([`El asistente ${value.nombre} fue guardado correctamente!`]);
            
        })
    }
    
        return (
            <React.Fragment>
                <div className='container_AsistenteEdit'>
                
                    <div className='tittle_AsistenteEdit'>
                        <h1>Editar Asistente </h1>
                        <h1><a type='submit' href='/asistentes'>Volver</a> </h1>
                    </div>
                    {asistente.map((asistente) => (
                    <form className='bodyAsistenteEdit' onSubmit={handleUpdateSubmit} key={asistente.idasistente}>
                        <label>Nombre:</label>
                        <input  type='text'  name='nombre' value={asistente.nombre} onChange={handleChange}/>
                        <label>Legajo:</label>
                        <input  type='text'  name='legajo'  onChange={handleChange}/>
                        <label>Tipo de documento:</label>
                        <input  type='text'  name='tipodoc'  onChange={handleChange}/>
                        <label>DNI:</label>
                        <input  type='text'  name='dni'   onChange={handleChange}/>
                        <label>Cargo:</label>
                        <input  type='text'  name='cargo'   onChange={handleChange}/>
                        <label>Sector:</label>
                        <input  type='text'  name='sector'   onChange={handleChange}/>
                        <label>Fecha de Ingreso:</label>
                        <input  type='date'  name='fechaingreso'  onChange={handleChange}/>
                        <button type="submit" onClick={handleUpdateSubmit}> Guardar</button>
                    </form>
                ))}
                </div>
            </React.Fragment>
        )}
    
export default AsistenteEdit;