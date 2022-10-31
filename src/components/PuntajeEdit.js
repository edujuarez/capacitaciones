import React from 'react';
import { useState, useEffect, Fragment } from "react";

import { useParams } from "react-router-dom";


import './styles/puntajeEdit.css';


function PuntajeEdit () {
    
        return (
            <React.Fragment>
                <div className='container_AsistenteEdit'>
                
                    <div className='tittle_AsistenteEdit'>
                        <h1>Editar puntaje </h1>
                        <h1><a type='submit' href='/search'>Volver</a> </h1>
                    </div>
                    {asistente.map((asistente) => (
                    <form className='bodyAsistenteEdit' key={asistente.idasistente}>
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
    
export default PuntajeEdit;