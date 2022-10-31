import React from 'react';
import { useState, useEffect, Fragment } from "react";

import {axios} from 'axios';
import { useParams } from "react-router-dom";


import './styles/asistenteEdit.css';
import e from 'cors';


function AsistenteEdit () {
    const params = useParams();
    let idasistente = params.idasistente;

    const [name, setName] = useState([]);
    const [asistente, setAsistente ] = useState([]);
    const [value, setValue] = useState({
        nombre : "",
        legajo : "",
        tipodoc : "",
        dni : "",
        cargo : "",
        sector : "",
        fecha : new Date()
    })
    const handleChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })}

    useEffect(() => {
        let url = `https://capacitacionesiselin.herokuapp.com/asistente/${idasistente}`;
        fetch(url)
        .then(res => res.json())        
        .then(data => setAsistente(data))
    }, []);

    
    const updateAsistente = (idasistente) => {
        e.preventDefault();
        let updateURL = `https://capacitacionesiselin.herokuapp.com/asistente/${idasistente}/edit`;
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombre : `${value.nombre}`,
                legajo : `${value.legajo}`,
                tipodoc : `${value.tipodoc}`,
                dni : `${value.dni}`,
                cargo : `${value.cargo}`,
                sector : `${value.sector}`,
                fecha : new Date (`${value.fecha}`)
            })
        };
        console.log(requestOptions.body)
        fetch(updateURL, requestOptions)
        .then((res) => {
            alert("Asistente modificado correctamente");
            window.location.href = `https://capacitacionesiselin.herokuapp.com/asistente/${idasistente}`;
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
                    <form className='bodyAsistenteEdit' key={asistente.idasistente} type='submit'>
                        
                        <label>Nombre:</label>
                        <input  
                            type='text'  
                            name='nombre'
                            defaultValue={asistente.nombre}
                            placeholder={asistente.nombre} 
                            onChange={handleChange}
                        />
                        
                        <label>Legajo:</label>
                        <input  type='text'  name='legajo' defaultValue={asistente.legajo} onChange={handleChange}/>
                        <label>Tipo de documento:</label>
                        <input  type='text'  name='tipodoc' defaultValue={asistente.tipodoc} onChange={handleChange}/>
                        <label>DNI:</label>
                        <input  type='text'  name='dni' defaultValue={asistente.dni}  onChange={handleChange}/>
                        <label>Cargo:</label>
                        <input  type='text'  name='cargo' defaultValue={asistente.cargo}  onChange={handleChange}/>
                        <label>Sector:</label>
                        <input  type='text'  name='sector' defaultValue={asistente.sector}  onChange={handleChange}/>
                        <label>Fecha de Ingreso:</label>
                        <input  type='date'  name='fechaingreso' defaultValue={asistente.fecha}/>
                        <button
                            onClick={(e)=> {updateAsistente(asistente.idasistente)}}
                            > 
                            Guardar
                        </button>
                    </form>
                ))}
                </div>
            </React.Fragment>
        )}
    
export default AsistenteEdit;