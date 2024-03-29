import axios from 'axios';
import React from 'react';
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import moment from 'moment';
import 'moment/locale/es';

import './styles/asistentesView.css';


function NuevoAsistente() {
    const params = useParams();
    let idasistente = params.idasistente;
    const { location } = window;

    const [asistente, setAsistente] = useState([]);
    useEffect(() => {
        let url = `https://servercapacitaciones-production.up.railway.app/asistente/${idasistente}`;
        fetch(url)
            .then(res => {
                return res.json();
            })
            .then(data => {
                setAsistente(data);
            })
    }, []);

    const deleteSubmit = (asistenteID) => {
        let deleteURL = `https://servercapacitaciones-production.up.railway.app/asistente/${asistenteID}/delete`
        axios.delete(deleteURL)
            .then(response => {
                if (response.data != null) {
                    alert("El asistente fue borrado correctamente!");
                    location.href = '/asistente'
                }
            })
    };

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
                        <p className='campo' name='nombre' >{asistente.nombre}</p>
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
                        <p className='campo' name='fechaingreso' >{moment(asistente.fechaingreso).format('L')}</p>
                        <section className='buttonsAsistentes'>
                            <button className=''>
                                <Link className='buttonLink' to={`/asistentes/${asistente.idasistente}/edit`}>
                                    Editar</Link>
                            </button>
                            <button onClick={() => { deleteSubmit(asistente.idasistente) }}>Eliminar</button>
                        </section>
                    </form>
                ))}
            </div>

        </React.Fragment>
    )
}

export default NuevoAsistente;