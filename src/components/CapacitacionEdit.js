import React from "react";
import { useState, useEffect } from "react";
import './styles/capacitacionEdit.css';
import { useParams } from "react-router-dom";
import moment from 'moment';
import 'moment/locale/es';


function capacitacionEdit() {
    const params = useParams();
    let idcapacitacion = params.idcapacitacion;

    //Trae datos de la capacitacion solicitada
    const [capacitacion, setCapacitacion] = useState([]);
    useEffect(() => {
        let url = `https://servercapacitaciones-production.up.railway.app/capacitaciones/${idcapacitacion}`;
        fetch(url)
            .then(res => {
                return res.json();
            })
            .then(data => {
                console.log(data)
                //cambio el formato de fecha
                data.forEach(element => {
                    element.fecha = moment(element.fecha).format('YYYY-MM-DD');
                });
                setCapacitacion(data[0]);
            })
    }, []);



    //manejo de los cambios en los inputs
    const handleChange = (event) => {
        // Obtener el valor del campo de formulario en el que se produjo el cambio
        const value = event.target.value;
        // Obtener el nombre del campo de formulario en el que se produjo el cambio
        const name = event.target.name;
        // Actualizar el estado del formulario con el nuevo valor
        setCapacitacion({
            ...capacitacion,
            [name]: value
        });
    }

    //Guarda los cambios en la capacitacion
    const handleSubmit = (event) => {
        event.preventDefault();
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(capacitacion)
        };
        fetch(`https://servercapacitaciones-production.up.railway.app/capacitaciones/${idcapacitacion}/edit`, requestOptions)
            .then(response => {
                alert("Capacitación modificada correctamente");
                window.location.href = `/capacitaciones/${idcapacitacion}`;
            })
    }

    return (
        <React.Fragment>
            <div className='container_capacitacionEdit'>
                <div className='mainTittle'>
                    <h1> Editar capacitación</h1>
                    <h1>{capacitacion.nombre}</h1>
                </div>
                <form className='bodyCapacitacion' onSubmit={handleSubmit} key={capacitacion.idcapacitacion}>
                    <label>Nombre:</label>
                    <input type='text' name='nombre' value={capacitacion.nombre} onChange={handleChange} />
                    <label>Temario:</label>
                    <input type='text' name='temario' value={capacitacion.temario} onChange={handleChange} />
                    <div className='selectContainer'>
                        <div className='select'>
                            <label>Tipo:</label>
                            <select name='tipo' forms='typeform' value={capacitacion.tipo} onChange={handleChange} >
                                <option value="Seleccionar">Seleccionar</option>
                                <option value='Desarrollo'>Desarrollo</option>
                                <option value='Preventiva'>Preventiva</option>
                                <option value='Correctiva'>Correctiva</option>
                            </select>
                        </div>
                        <div className='select'>
                            <label>Categoria:</label>
                            <select name='categoria' forms='typeform' value={capacitacion.categoria} onChange={handleChange} placeholder="Seleccionar">
                                <option value="Seleccionar">Seleccionar</option>
                                <option value='Programada'>Programada</option>
                                <option value='Emergente'>Emergente</option>
                            </select>
                        </div>
                        <div className='select'>
                            <label>Certificación:</label>
                            <select name='certificacion' forms='typeform' value={capacitacion.certificado} onChange={handleChange} >
                                <option value="Seleccionar">Seleccionar</option>
                                <option value='Si'>Si</option>
                                <option value='No'>No</option>
                            </select>
                        </div>
                        <div className='select'>
                            <label>Fecha:</label>
                            <input type='date' name="fecha" value={capacitacion.fecha} onChange={handleChange} />
                        </div>
                        <div className='select'>
                            <label>Plan:</label>
                            <select name='plan' forms='typeform' value={capacitacion.plan} onChange={handleChange} >
                                <option value="Seleccionar">Seleccionar</option>
                                <option value='General'>General</option>
                                <option value='HyS'>Higiene y Seguridad</option>
                                <option value='Otro'>Otro</option>
                            </select>
                        </div>
                        <div className='select'>
                            <label>Entrega de material:</label>
                            <select name='material' forms='typeform' value={capacitacion.material} onChange={handleChange} >
                                <option value="Seleccionar">Seleccionar</option>
                                <option value='Si'>Si</option>
                                <option value='No'>No</option>
                            </select>
                        </div>
                        <div className='select'>
                            <label>Duración:</label>
                            <input name='duracion' forms='typeform' type="number" step="0.5" min="0" value={capacitacion.duracion} onChange={handleChange} placeholder="hs" />hs
                        </div>
                        <div className='select'>
                            <label>Modalidad:</label>
                            <select name='modalidad' forms='typeform' value={capacitacion.modalidad} onChange={handleChange} placeholder="Seleccionar">
                                <option value="Seleccionar">Seleccionar</option>
                                <option value='Virtual'>Virtual</option>
                                <option value='Presencial'>Presencial</option>
                            </select>
                        </div>
                        <div className='select'>
                            <label>Capacitador:</label>
                            <input name='capacitador' forms='typeform' type="text" value={capacitacion.capacitador} onChange={handleChange} placeholder="Ingrese capacitador" />
                        </div>

                    </div>
                    <label>Observaciones:</label>
                    <textarea name='observaciones' cols="40" rows="5" value={capacitacion.observaciones} onChange={handleChange} />
                    <button type="submit" onClick={handleSubmit}>Guardar cambios</button>
                </form>
                <div className="buttonsCapacitaciones">
                    <a type="button" href={'/capacitaciones/' + (idcapacitacion)} className="button">Volver</a>
                </div>


            </div>

        </React.Fragment>
    );
}
export default capacitacionEdit;