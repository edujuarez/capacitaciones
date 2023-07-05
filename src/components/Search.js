import React from "react";
import './styles/search.css'
import { useState, Fragment, useEffect } from 'react';
import { useParams } from "react-router-dom";


function Search() {
    //trae id de capacitacion seleccionada
    const params = useParams();
    let idcapacitacion = params.idcapacitacion;

    //carga los asistentes al cuadro de busqueda
    const [busqueda, setBusqueda] = useState([]);
    const [nuevoPuntaje, setNuevoPuntaje] = useState("");
    const [nuevaAsistencia, setNuevaAsistencia] = useState("");
    const [nuevoPorcentaje, setNuevoPorcentaje] = useState("");
    const [nuevoIndex, setNuevoIndex] = useState("");
    const [searchTerms, setSearchTerms] = useState([]);


    useEffect(() => {
        fetch("https://servercapacitaciones-production.up.railway.app/asistentes")
            .then(res => {
                return res.json();
            })
            .then(data => {
                setBusqueda(data);
            })
    }, []);

    //Elimina asistente de la lista
    const deleteAsistente = (id) => {
        let deleteURL = "https://servercapacitaciones-production.up.railway.app/deleteasistente"
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id })
        };
        fetch(deleteURL, requestOptions)
            .then((res) => {
                alert("Asistente eliminado");
                window.location.href = "/search";
            })
    };

    //edita los valores de puntaje
    const updateNuevoPuntaje = (id, index) => {
        let updateURL = "https://servercapacitaciones-production.up.railway.app/updatepuntaje";
        busqueda.filter(busqueda => busqueda.id == id)
        {
            {
                if (busqueda.asistencia == "") {
                    return nuevaAsistencia = "0";
                }
            }
        }
        setNuevoIndex(index)
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id, puntaje: nuevoPuntaje == "" ? busqueda[index].puntaje : nuevoPuntaje, asistencia: nuevaAsistencia == "" ? busqueda[index].asistencia : nuevaAsistencia, porcentaje: nuevoPorcentaje /*== "" ? busqueda[index].porcentaje : nuevoPorcentaje*/ })
        };
        fetch(updateURL, requestOptions)
            .then((res) => {
                alert("Asistente " + busqueda[index].nombre + " modificado");
                //window.location.href = "/search";
            })
    };

    return (
        <div className="containerSearch">
            <div className="tittleSection">
                <div className="tittle">
                    <h1>Buscar capacitación</h1>
                    <input className="inputSearch"
                        type="text"
                        placeholder="Ingrese capacitación o asistente"
                        onChange={(e) => {
                            setSearchTerms(e.target.value);
                        }}
                    />
                </div>
            </div>
            <div className='card'>
                <h1>Capacitación</h1>
                <h1>Asistente</h1>
                <h1>Asistió</h1>
                <h1>Nota</h1>
                <h1>Operaciones</h1>
            </div>
            {busqueda.filter((val) => {
                if (searchTerms == "") {
                    return val
                } else if (val.nombre.toLowerCase().includes(searchTerms.toLowerCase()) || val.nombreCapacitacion.toLowerCase().includes(searchTerms.toLowerCase())) {
                    return val
                }
            }).map((val, index) => {
                return (
                    <div key={val.id}>
                        <div className='card' >
                            <div className='column'>
                                <p>{val.nombreCapacitacion}</p>
                            </div>
                            <div className='column'>
                                <p>{val.nombre}</p>
                            </div>
                            <div className='column'>
                                <select defaultValue={val.asistencia}
                                    onChange={(e) => { setNuevaAsistencia(e.target.value) }}>
                                    <option value="">Sin Cargar</option>
                                    <option value="1">Si</option>
                                    <option value="0">No</option>
                                </select>
                            </div>
                            <div className='column'>
                                <select
                                    defaultValue={val.puntaje}
                                    onChange={(e) => { setNuevoPuntaje(e.target.value) }}>
                                    <option value="Sin Cargar">Sin Cargar</option>
                                    <option value="No aplica">No aplica</option>
                                    <option value="Aprobado">Aprobado</option>
                                    <option value="Desaprobado">Desaprobado</option>
                                </select>
                                <p>Porcentaje de aprobación</p>
                                <input
                                    type="number"
                                    onChange={(e) => { setNuevoPorcentaje(e.target.value) }}
                                    defaultValue={val.porcentaje}>
                                </input>
                            </div>
                            <div className='column containerButtonsOperaciones'>
                                <button
                                    onClick={() => { updateNuevoPuntaje(val.id, index) }}
                                    className="buttonOperaciones"
                                >
                                    Guardar
                                </button>
                                <button
                                    onClick={() => { deleteAsistente(val.id) }}
                                    className="buttonOperaciones"
                                >
                                    Eliminar
                                </button>
                                <button
                                    onClick={() => { window.location.href = `/capacitaciones/` + (val.capacitacionID) }}
                                    className="buttonOperaciones"
                                >
                                    Detalles
                                </button>

                            </div>

                        </div>
                    </div>

                )
            })}
        </div>
    );
}

export default Search;