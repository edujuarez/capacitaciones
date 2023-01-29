import React from "react";
import './styles/calificaciones.css'
import { useState, Fragment, useEffect } from 'react';
import { useParams } from "react-router-dom";


function Calificaciones() {
    //trae id de capacitacion seleccionada
    const params = useParams();
    let idcapacitacion = params.idcapacitacion;

    //trae datos de la capacitacion seleccionada
    const [capacitacion, setCapacitacion] = useState([]);
    useEffect(() => {
        let url = `https://servercapacitaciones-production.up.railway.app/asistentes/${idcapacitacion}`;
        fetch(url)
        .then(res => {
            return res.json();
        })
        .then(data => {
            setCapacitacion(data);
            setNombreCapacitacion(data[0].nombreCapacitacion);
        })
    }, []);

    //carga los asistentes al cuadro de busqueda
    const [nuevoPuntaje, setNuevoPuntaje] = useState("");
    const [nuevaAsistencia, setNuevaAsistencia] = useState("");
    const [nuevoPorcentaje, setNuevoPorcentaje] = useState("");
    const [nuevoIndex, setNuevoIndex] = useState("");
    const [nombreCapacitacion, setNombreCapacitacion] = useState("");

    //Elimina asistente de la lista
    const deleteAsistente = (id) => {
        let deleteURL = `https://servercapacitaciones-production.up.railway.app/deleteasistente/${id}`
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id})
        };
        fetch(deleteURL, requestOptions)
        .then((res) => {
            alert("Asistente eliminado");
            window.location.href = `/calificaciones/`+idcapacitacion;
        })
    };

    //edita los valores de puntaje
    const guardarDatos = (id, index) => {
        //url de consulta para la capacitacion especifica
        let updateURL = "https://servercapacitaciones-production.up.railway.app/updatepuntaje";
            capacitacion.filter(capacitacion => capacitacion.id == id)
             {
                  { if (capacitacion.asistencia == "")
                    {
                    return nuevaAsistencia= "0";
                    } 
                 }
            }
            setNuevoIndex (index)
            const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id, puntaje: nuevoPuntaje == "" ? capacitacion[index].puntaje : nuevoPuntaje, asistencia: nuevaAsistencia == "" ? capacitacion[index].asistencia : nuevaAsistencia, porcentaje: nuevoPorcentaje == "" ? capacitacion[index].porcentaje : nuevoPorcentaje})
        };
        fetch(updateURL, requestOptions)
        .then((res) => {
            alert("Asistente " + capacitacion[index].nombre + " modificado");
        })
    };    
    
    return (
        <div className="containerSearch">
            <div className="tittleSection">
                <div className="tittle">
                    <h1>Calificaciones</h1>
                    <h1 className="nombreCapacitacion">{nombreCapacitacion}</h1>
                </div>          
            </div>
            <div className='card'>
                <h1>Asistente</h1>
                <h1>Asistió</h1>
                <h1>Nota</h1>
                <h1>Operaciones</h1>
            </div>
            {capacitacion.map((val, index) => {
            return (                   
                <div key={val.id}>
                    <div className='card' >
                        <div className='column'>
                            <p>{val.nombre}</p>
                        </div>
                        <div className='column'>
                            <select defaultValue={val.asistencia}
                                onChange={(e)=>{ setNuevaAsistencia(e.target.value)}}>
                                <option value="">Sin Cargar</option>
                                <option value="1">Si</option>
                                <option value="0">No</option>
                            </select>
                        </div>
                        <div className='column'>
                            <select 
                                defaultValue={val.puntaje} 
                                onChange={(e) =>{ setNuevoPuntaje(e.target.value)}}>
                                    <option value="Sin Cargar">Sin Cargar</option>
                                    <option value="No aplica">No aplica</option>
                                    <option value="Aprobado">Aprobado</option>
                                    <option value="Desaprobado">Desaprobado</option>
                            </select>
                            <p>Porcentaje de aprobación</p>
                            <input 
                                type="number" 
                                onChange={(e) => {setNuevoPorcentaje(e.target.value)}} 
                                defaultValue={val.porcentaje}>  
                            </input>
                        </div>
                        <div className='column containerButtonsOperaciones'>
                            <button 
                                onClick={() =>{guardarDatos(val.id, index)}} 
                                className="buttonOperaciones"
                                >
                                Guardar
                            </button>             
                            <button 
                                onClick={() =>{deleteAsistente(val.id)}} 
                                className="buttonOperaciones"
                                >
                                Eliminar
                            </button>
                        </div>
            
                    </div>
                </div>
                    
            )})}
        </div>
        );
}

export default Calificaciones;