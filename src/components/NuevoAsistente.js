import React, { useState }from 'react';
import axios from 'axios';

import './styles/nuevoAsistente.css';
import { BsReverseBackspaceReverse } from 'react-icons/bs';


function NuevoAsistente () {
    
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
    const baseURL = "http://localhost:3006/asistente/nuevo"
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(baseURL,{
            nombre : `${value.nombre}`,
            legajo : `${value.legajo}`,
            tipodoc : `${value.tipodoc}`,
            dni : `${value.dni}`,
            cargo : `${value.cargo}`,
            sector : `${value.sector}`,
            fechaingreso : `${value.fechaingreso}`
        }).then (() => {
            alert([`El asistente ${value.nombre} fue guardado correctamente!`]);
            location.href = '/asistentes'

            
        })
    }
    
        return (
            <React.Fragment>
                <div className='container_nuevoAsistente'>
                    <div className='tittle'>
                        <h1>Nuevo Asistente </h1>
                    </div>
                    <form className='bodyAsistente' onSubmit={handleSubmit}>
                        <label>Nombre:</label>
                        <input  type='text'  name='nombre'  onChange={handleChange} required/>
                        <label>Legajo:</label>
                        <input  type='text'  name='legajo'  onChange={handleChange} required/>
                        <label>Tipo de documento:</label>
                        <input  type='text'  name='tipodoc'  onChange={handleChange} required/>
                        <label>DNI:</label>
                        <input  type='text'  name='dni'   onChange={handleChange} required/>
                        <label>Cargo:</label>
                        <input  type='text'  name='cargo'   onChange={handleChange} required/>
                        <label>Sector:</label>
                        <input  type='text'  name='sector'   onChange={handleChange} required/>
                        <label>Fecha de Ingreso:</label>
                        <input  type='date'  name='fechaingreso'  onChange={handleChange} required/>
                        <button type="submit" onClick={handleSubmit}> Guardar</button>
                    </form>
                
                </div>
            </React.Fragment>
        )}
    
export default NuevoAsistente;