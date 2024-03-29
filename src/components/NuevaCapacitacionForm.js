import React, { useState, useEffect } from "react";
import axios from 'axios';
import Multiselect from 'multiselect-react-dropdown';
import moment from "moment";


import './styles/nuevaCapacitacionForm.css';
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { Redirect } from "react-router-dom";

function NuevaCapacitacionForm() {
    moment().format('L');
    const [asistentes, setAsistentes] = useState([]);
    useEffect(() => {
        fetch("https://servercapacitaciones-production.up.railway.app/asistente")
            .then(res => {
                return res.json();
            })
            .then(data => {
                setAsistentes(data);
            })
    }, []);
    const [value, setValue] = useState({
        nombre: "",
        temario: "",
        tipo: "",
        categoria: "",
        certificacion: "",
        fecha: new Date,
        plan: "",
        material: "",
        observaciones: "",
        modalidad: "",
        eliminado: 0,
        capacitador: "",
        linkQR: ""
    });

    const [capacitaciones, setCapacitaciones] = useState([]);
    useEffect(() => {
        let url = "https://servercapacitaciones-production.up.railway.app/capacitaciones";
        fetch(url)
            .then(res => {
                return res.json();
            })
            .then(data => {
                setCapacitaciones(data);
            })
    }, []);

    const handleChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })
    }
    const capacitacionURL = "https://servercapacitaciones-production.up.railway.app/capacitaciones/nuevo"
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(capacitacionURL, {
            nombre: `${value.nombre}`,
            temario: `${value.temario}`,
            tipo: `${value.tipo}`,
            categoria: `${value.categoria}`,
            certificacion: `${value.certificacion}`,
            fecha: `${value.fecha} 05:00:00`,
            plan: `${value.plan}`,
            material: `${value.material}`,
            observaciones: `${value.observaciones}`,
            duracion: `${value.duracion}`,
            modalidad: `${value.modalidad}`,
            eliminado: 0,
            capacitador: `${value.capacitador}`,
            linkQR: `${value.linkQR}`
        }).then(() => {
            alert([`La capacitacion ${value.nombre} fue creada correctamente! Fecha ${moment(value.fecha).format('L')}`]);
            window.location.href = "/capacitacion";

        });

    }

    return (
        <React.Fragment>
            <div className='container_nuevaCapacitacion'>
                <div className='mainTittle'>
                    <h1>Nueva Capacitación</h1>
                </div>
                <form className='bodyCapacitacion' onSubmit={handleSubmit}>
                    <label>Nombre:</label>
                    <input type='text' name='nombre' onChange={handleChange} />
                    <label>Temario:</label>
                    <input type='text' name='temario' onChange={handleChange} />
                    <div className='selectContainer'>
                        <div className='select'>
                            <label>Tipo:</label>
                            <select name='tipo' forms='typeform' onChange={handleChange} >
                                <option value="Seleccionar">Seleccionar</option>
                                <option value='Desarrollo'>Desarrollo</option>
                                <option value='Preventiva'>Preventiva</option>
                                <option value='Correctiva'>Correctiva</option>
                            </select>
                        </div>
                        <div className='select'>
                            <label>Categoria:</label>
                            <select name='categoria' forms='typeform' onChange={handleChange} placeholder="Seleccionar" defaultValue="Seleccionar">
                                <option value="Seleccionar">Seleccionar</option>
                                <option value='Programada'>Programada</option>
                                <option value='Emergente'>Emergente</option>
                            </select>
                        </div>
                        <div className='select'>
                            <label>Certificación:</label>
                            <select name='certificacion' forms='typeform' onChange={handleChange} >
                                <option value="Seleccionar">Seleccionar</option>
                                <option value='Si'>Si</option>
                                <option value='No'>No</option>
                            </select>
                        </div>
                        <div className='select'>
                            <label>Fecha:</label>
                            <input type='date' name="fecha" onChange={handleChange} />
                        </div>
                        <div className='select'>
                            <label>Plan:</label>
                            <select name='plan' forms='typeform' onChange={handleChange} >
                                <option value="Seleccionar">Seleccionar</option>
                                <option value='General'>General</option>
                                <option value='HyS'>Higiene y Seguridad</option>
                                <option value='Otro'>Otro</option>
                            </select>
                        </div>
                        <div className='select'>
                            <label>Entrega de material:</label>
                            <select name='material' forms='typeform' onChange={handleChange} >
                                <option value="Seleccionar">Seleccionar</option>
                                <option value='Si'>Si</option>
                                <option value='No'>No</option>
                            </select>
                        </div>
                        <div className='select'>
                            <label>Duración:</label>
                            <input name='duracion' forms='typeform' type="number" step="0.5" min="0" onChange={handleChange} placeholder="hs" />
                        </div>
                        <div className='select'>
                            <label>Modalidad:</label>
                            <select name='modalidad' forms='typeform' onChange={handleChange} placeholder="Seleccionar" defaultValue="Seleccionar">
                                <option value="Seleccionar">Seleccionar</option>
                                <option value='Virtual'>Virtual</option>
                                <option value='Presencial'>Presencial</option>
                                <option value='Mixta'>Mixta</option>

                            </select>
                        </div>
                        <div className='select'>
                            <label>Capacitador:</label>
                            <input name='capacitador' forms='typeform' type="text" onChange={handleChange} placeholder="Ingrese nombre capacitador" />
                        </div>
                        <div className='select'>
                            <label>Link QR credenciales:</label>
                            <input name='linkQR' forms='typeform' type="text" onChange={handleChange} placeholder="Ingrese link de credenciales para QR" />
                        </div>

                    </div>
                    <label>Observaciones:</label>
                    <textarea name='observaciones' cols="40" rows="5" onChange={handleChange} />
                    <button type="submit" onClick={handleSubmit}>Guardar</button>
                </form>
            </div>
        </React.Fragment>
    );
}

export default NuevaCapacitacionForm;