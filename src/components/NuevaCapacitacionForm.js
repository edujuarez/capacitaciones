import React, { useState} from "react";
import axios from 'axios';


import './styles/nuevaCapacitacionForm.css';

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100;300&display=swap');
</style> 

function  NuevaCapacitacionForm(){
        const [value, setValue] = useState ({
            nombre : "",
            temario : "",
            tipo : "",
            certificacion : "",
            fecha : "",
            plan : "",
            material : "",
            observaciones : "",
            asistentes : ""
        });

        const handleChange = (e) => {
            setValue({
                ...value,
                [e.target.name]: e.target.value
            })
        }
        
        const capacitacionURL = "https://capacitacionesiselin.herokuapp.com/nuevo"
        const handleSubmit = (e) => {
            console.log(`${value.fecha}`)
            e.preventDefault();
            axios.post(capacitacionURL, {
                nombre : `${value.nombre}`,
                temario : `${value.temario}`,
                tipo : `${value.tipo}`,
                certificacion : `${value.certificacion}`,
                fecha : `${value.fecha}`,
                plan : `${value.plan}`,
                material : `${value.material}`,
                observaciones : `${value.observaciones}`,
                asistentes : `${value.asistentes}`
            }).then (() => {
                alert([`La capacitacion ${value.nombre} fue creada correctamente!`]);
                
            })
        }

        return (
            <React.Fragment>
                <div className='container_nuevaCapacitacion'>
                    <div className='mainTittle'>
                        <h1>Nueva Capacitacion</h1>
                    </div>
                    <form className='bodyCapacitacion' onSubmit={handleSubmit}>
                        <label>Nombre:</label>
                        <input type='text' name='nombre' onChange={handleChange}/>
                        <label>Temario:</label>
                        <input  type='text' name='temario' onChange={handleChange}/>
                        <div className='selectContainer'>
                            <div className='select'>
                                <label>Tipo:</label>
                                <select name='tipo' forms='typeform' onChange={handleChange}>
                                    <option value='Desarrollo'>Desarrollo</option>
                                    <option value='Preventiva'>Preventiva</option>
                                    <option value='Correctiva'>Correctiva</option>
                                </select>
                            </div>                        
                            <div className='select'>
                                <label>Certificacion:</label>
                                <select name='certificacion' forms='typeform' onChange={handleChange}>
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
                                <select name='plan' forms='typeform' onChange={handleChange}>
                                    <option value='Si'>General</option>
                                    <option value='HyS'>Higiene y Seguridad</option>
                                    <option value='Otro'>Otro</option>
                                </select>
                            </div>
                            <div className='select'>
                                <label>Entrega de material:</label>
                                <select name='material' forms='typeform' onChange={handleChange}>
                                    <option value='Si'>Si</option>
                                    <option value='No'>No</option>
                                </select> 
                            </div>
                        </div>
                        <label>Observaciones:</label>
                        <textarea name='observaciones' cols="40" rows="5" onChange={handleChange}/>
                        <div className='select'>
                            <label>Asistentes</label>
                            <select name='asistentes' forms='typeform' onChange={handleChange}>
                                <option value='ejemplo'>ejemplo</option>
                                <option value='ejemplo2'>ejemplo2</option>
                                <option value='Etc'> etc</option>
                            </select>
                        </div>
                        <button type="submit" onClick={handleSubmit}>Guardar</button>     
                    </form>
                   
                </div>
        
        </React.Fragment>
    );
}

export default NuevaCapacitacionForm;