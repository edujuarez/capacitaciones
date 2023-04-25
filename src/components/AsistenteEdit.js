import React from 'react';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import 'moment/locale/es';

import './styles/asistenteEdit.css';


function AsistenteEdit() {
    const params = useParams();
    let idasistente = params.idasistente;

    const [asistente, setAsistente] = useState({
        nombre: '',
        legajo: '',
        tipodoc: '',
        dni: '',
        cargo: '',
        sector: '',
        fechaingreso: Date.now()
    }); //estado del asistente a editar
    //obtiene los datos del asistente a editar
    useEffect(() => {
        let url = `https://servercapacitaciones-production.up.railway.app/asistente/${idasistente}`;
        fetch(url)
            .then((res) => res.json())
            .then((data) => setAsistente(data[0]))
    }, []);
    console.log(asistente)

    //maneja los cambios en los inputs
    const handleChange = (event) => {
        // Obtener el valor del campo de formulario en el que se produjo el cambio
        const value = event.target.value;
        // Obtener el nombre del campo de formulario en el que se produjo el cambio
        const name = event.target.name;
        // Actualizar el estado del formulario con el nuevo valor
        setAsistente({
            ...asistente,
            [name]: value
        });
    };

    //guardar los cambios en la base de datos
    const handleSubmit = (event) => {
        event.preventDefault();
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(asistente)
        };
        fetch(`https://servercapacitaciones-production.up.railway.app/asistente/${idasistente}/edit`, requestOptions)
            .then((res) => {
                alert("Asistente modificado correctamente");
                window.location.href = `/asistentes/${idasistente}`;
            })
    };



    return (
        <React.Fragment>
            <div className='container_AsistenteEdit'>

                <div className='tittle_AsistenteEdit'>
                    <h1>Editar Asistente </h1>
                    <h1><a type='submit' href='/asistentes'>Volver</a> </h1>
                </div>
                <form className='bodyAsistenteEdit' type='submit'>
                    <label>Nombre:</label>
                    <input
                        type='text'
                        name='nombre'
                        value={asistente.nombre}
                        onChange={handleChange}
                    />
                    <label>Legajo:</label>
                    <input type='text' name='legajo' value={asistente.legajo} onChange={handleChange} />
                    <label>Tipo de documento:</label>
                    <input type='text' name='tipodoc' value={asistente.tipodoc} onChange={handleChange} />
                    <label>DNI:</label>
                    <input type='text' name='dni' value={asistente.dni} onChange={handleChange} />
                    <label>Cargo:</label>
                    <input type='text' name='cargo' value={asistente.cargo} onChange={handleChange} />
                    <label>Sector:</label>
                    <input type='text' name='sector' value={asistente.sector} onChange={handleChange} />
                    <label>Fecha de Ingreso:</label>
                    <input type='date' name='fechaingreso' value={asistente.fechaingreso} onChange={handleChange} />
                    <button
                        onClick={(e) => { handleSubmit(e) }}
                    >
                        Guardar
                    </button>
                </form>
            </div>
        </React.Fragment>
    )
}

export default AsistenteEdit;