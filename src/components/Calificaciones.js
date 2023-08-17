import React from "react";
import './styles/calificaciones.css'
import { useState, useEffect } from 'react';
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
                const ordenado = data.sort(function (a, b) { return a.nombre - b.nombre })
                setCapacitacion(ordenado);
                setNombreCapacitacion(data[0].nombreCapacitacion);
            })
    }, []);
console.log(capacitacion)

    //se crea array dejaremos los valores default y luego cambiaremos
    const edicionPuntaje = capacitacion.map((capacitacion) => (
        {
            'id': capacitacion.id,
            'asistencia': capacitacion.asistencia,
            'porcentaje': capacitacion.porcentaje,
            'puntaje': capacitacion.puntaje
        }))

    //maneja los cambios en el array del input que se cambio
    const cambioAsistencia = (index, valor) => {
        edicionPuntaje[index].asistencia = valor
    }
    const cambioPuntaje = (index, valor) => {
        edicionPuntaje[index].puntaje = valor
    }
    const cambioPorcentaje = (index, valor) => {
        edicionPuntaje[index].porcentaje = valor
    }


    //carga los asistentes al cuadro de busqueda
    const [nuevaAsistencia, setNuevaAsistencia] = useState("");
    const [nombreCapacitacion, setNombreCapacitacion] = useState("");

    //Elimina asistente de la lista
    const deleteAsistente = (id) => {
        let deleteURL = `https://servercapacitaciones-production.up.railway.app/deleteasistente/${id}`
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id })
        };
        fetch(deleteURL, requestOptions)
            .then((res) => {
                alert("Asistente eliminado");
                window.location.href = `/calificaciones/` + idcapacitacion;
            })
    };

    //edita los valores de puntaje
    const guardarDatos = (id, index) => {
        //url de consulta para la capacitacion especifica
        let updateURL = "https://servercapacitaciones-production.up.railway.app/updatepuntaje";

        //se envia con el metodo put los valores finales de edicionPuntaje, si no hay cambios se envia el default
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: id,
                asistencia: edicionPuntaje[index].asistencia, 
                puntaje: edicionPuntaje[index].puntaje,
                porcentaje: edicionPuntaje[index].porcentaje,
            })
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
                    <br></br>

                    <h1 className="nombreCapacitacion">Calificaciones</h1>
                    <br></br>
                    <h1 className="nombreCapacitacion">{nombreCapacitacion}</h1>
                </div>
                <h1><a type='submit' href={`/capacitaciones/` + idcapacitacion}>Volver</a></h1>
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
                                    onChange={(e) => { cambioAsistencia(index, e.target.value) }}>
                                    <option value="">Sin Cargar</option>
                                    <option value="1">Si</option>
                                    <option value="0">No</option>
                                </select>
                            </div>
                            <div className='column'>
                                <select
                                    defaultValue={val.puntaje}
                                    onChange={(e) => { cambioPuntaje(index, e.target.value) }}>
                                    <option value="Sin Cargar">Sin Cargar</option>
                                    <option value="No aplica">No aplica</option>
                                    <option value="Aprobado">Aprobado</option>
                                    <option value="Desaprobado">Desaprobado</option>
                                </select>
                                <p>Porcentaje de aprobación</p>
                                <input
                                    type="number"
                                    onChange={(e) => { cambioPorcentaje(index, e.target.value) }}
                                    defaultValue={val.porcentaje}>
                                </input>
                            </div>
                            <div className='column containerButtonsOperaciones'>
                                <button
                                    onClick={() => { guardarDatos(val.id, index) }}
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
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default Calificaciones;