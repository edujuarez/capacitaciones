import React from "react";
import { useState, useEffect, Fragment } from "react";
import './styles/capacitacionView.css';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/es';

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100;300&display=swap');
</style> 

function CapacitacionView() {
    const params = useParams();
    let idcapacitacion = params.idcapacitacion;

    //Trae datos de la capacitacion solicitada
    const  [capacitacion, setCapacitacion ] = useState([]);
    useEffect(() => {
        let url = `https://servercapacitaciones-production.up.railway.app/capacitaciones/${idcapacitacion}`;
        fetch(url)
        .then(res => {
            return res.json();
        })
        .then(data => {
            setCapacitacion(data);
        })
    }, []);

    //Elimina capacitacion
    const deleteCapacitacion = (idcapacitacion) => {
       let deleteURL = `https://servercapacitaciones-production.up.railway.app/capacitaciones/${idcapacitacion}/delete`
       const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: idcapacitacion})
    };
    console.log(requestOptions.body)
    fetch(deleteURL, requestOptions)
    .then((res) => {
        alert("Capacitacion eliminada");
        window.location.href = "/capacitacion";
    })
};
 
    //Trae las asistencias que matchean con la capacitacion
    const  [asistentesList, setAsistentesList ] = useState([]);
    useEffect(() => {
        let urlAsistentesList = `https://servercapacitaciones-production.up.railway.app/addasistentes/${idcapacitacion}`;
        fetch(urlAsistentesList)
        .then(res => {
            return res.json();
        })
        .then(data => {
            setAsistentesList(data);
        })
    }, []);


    return (
        <React.Fragment>
        <div className='container_capacitacionView'>
            <div className='mainTittle'>
                <h1> Detalle de capacitación</h1>
                <h1><a type='submit' href='/capacitacion'>Volver  </a></h1>
            </div>
            {capacitacion.map((capacitacion) => (
                <div className='bodyCapacitacionView'  key={capacitacion.idcapacitacion}>
                    <label>Nombre de capacitación:</label >
                    <p className='campo'name='nombre'>{capacitacion.nombre}</p>
                    <label>Temario:</label>
                    <p className='campo' >{capacitacion.temario}</p>
                    <div className='selectContainer'>
                        <div className='select'>
                            <label>Tipo:</label>
                            <p className='campo'>{capacitacion.tipo}</p>
                        </div>
                        <div className='select'>
                            <label>Categoria:</label>
                            <p className='campo'>{capacitacion.categoria}</p>
                        </div>                        
                        <div className='select'>
                            <label>Certificación:</label>
                            <p className='campo'>{capacitacion.certificacion}</p>
                        </div>
                        <div className='select'>
                            <label>Fecha:</label>
                            <p className='campo'>{moment(capacitacion.fecha).format('L') }</p>
                        </div>
                        <div className='select'>
                            <label>Plan:</label>
                            <p className='campo'>{capacitacion.plan}</p>
                        </div>
                        <div className='select'>
                            <label>Entrega de material:</label>
                            <p className='campo'>{capacitacion.material}</p>
                        </div>
                        <div className='select'>
                                <label>Duración:</label>
                                <p className="campo">{capacitacion.duracion} hs</p> 
                        </div>
                        <div className='select'>
                            <label>Modalidad:</label>
                            <p className='campo'>{capacitacion.modalidad}</p>
                        </div>
                        <div className='select'>
                                <label>Capacitador:</label>
                                <p className="campo" >{capacitacion.capacitador}</p>
                        </div>
                    </div>                    

                    <label>Observaciones:</label>
                    <div className='textarea'>
                        <p >{capacitacion.observaciones}</p>
                    </div>
                    <label>Invitados:</label>
                    <div className='invitados'>
                        {asistentesList.map((asistentes) => (
                        <p className='asistente' key={asistentes.invitadoID}>{asistentes.nombre}</p>
                        ))}
                    </div>
                    <div className="buttonsCapacitaciones">
                        <a type="button" href={'/addAsistentes/'+ (idcapacitacion)} className="button">Agregar invitados</a>
                        <a type="button" href={'/certification/'+ (idcapacitacion)} className="button">Registro de capacitación</a>
                        <a type="button" href={'/calificaciones/'+ (idcapacitacion)} className="button">Calificaciones</a>
                        <a type="button" href={'/capacitaciones/'+ (idcapacitacion)+ '/edit'} className="button">Editar</a>
                        <button onClick={() =>{deleteCapacitacion(idcapacitacion)}}  className="button">Eliminar</button>

                    </div>
                        
                </div> 
            ))}     
   </div>

</React.Fragment>
    );
}
export default CapacitacionView;