import  axios  from 'axios';
import React from 'react';
import { useState, useEffect, Fragment } from "react";
import { useParams, Link } from "react-router-dom";


import './styles/asistentesView.css';


function NuevoAsistente () {
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

        const deleteSubmit = (asistenteID) => {
            let deleteURL = `https://capacitacionesiselin.herokuapp.com/asistente/${asistenteID}/delete`
            axios.delete(deleteURL)
            .then(response => {
                if(response.data != null) {
                    alert("El asistente fue borrado correctamente!");
                    location.href = '/asistente'
                }
            })
        };
    
    
    const editAsistente = () => {

    }
    
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
                        <p className='campo' name='fechaingreso' >{asistente.fechaingreso}</p>
                        <section className='buttonsAsistentes'>
                        <Link  className='buttonLink' to={`/asistentes/${asistente.idasistente}/edit`}>
                            <button className=''>Editar</button> </Link>
                            <button onClick={() => {deleteSubmit(asistente.idasistente)}}>Eliminar</button>
                        </section>
                    </form>
                ))} 
                </div>
                  
            </React.Fragment>
        )}
    
export default NuevoAsistente;