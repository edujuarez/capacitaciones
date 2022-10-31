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
        let url = `https://capacitacionesiselin.herokuapp.com/asistente/${idasistente}`;
        fetch(url)
        .then(res => {
            return res.json();
        })
        .then(data => {
            setAsistente(data);
        })
    }, []);

      const [value, setValue] = useState({ 
        nombre : "",
        legajo : "",
        tipodoc : "",
        dni : "",
        cargo : "",
        sector : "",
        fechaingreso : ""
    });

    const [newValueChange, setNewImageUrl] = useState(null);


    
    const handleEditChange = (e) => {
        e.preventDefault();
        setNewValueChange(e.target.value)
        console.log(e.target.value);
    }

    const baseURL = `https://capacitacionesiselin.herokuapp.com/asistente/${idasistente}/edit`
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
                        <input  type='text'  name='nombre' value={asistente.nombre} onChange={handleEditChange}/>
                        <label>Legajo:</label>
                        <input  type='text'  name='legajo' value={asistente.legajo} onChange={handleEditChange}/>
                        <label>Tipo de documento:</label>
                        <input  type='text'  name='tipodoc' value={asistente.tipodoc} onChange={handleEditChange}/>
                        <label>DNI:</label>
                        <input  type='text'  name='dni' value={asistente.dni}  onChange={handleEditChange}/>
                        <label>Cargo:</label>
                        <input  type='text'  name='cargo' value={asistente.cargo}  onChange={handleEditChange}/>
                        <label>Sector:</label>
                        <input  type='text'  name='sector' value={asistente.sector}  onChange={handleEditChange}/>
                        <label>Fecha de Ingreso:</label>
                        <input  type='date'  name='fechaingreso'  onChange={handleEditChange}/>
                        <button type="submit" onClick={handleUpdateSubmit}> Guardar</button>
                    </form>
                ))}
                </div>
            </React.Fragment>
        )}
    
export default AsistenteEdit;