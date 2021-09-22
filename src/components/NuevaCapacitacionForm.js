import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import reactDom from "react-dom";

import './styles/nuevaCapacitacionForm.css';

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100;300&display=swap');
</style> 

function  NuevaCapacitacionForm(){
        return (
        <div>
            <React.Fragment>
                <div className='container'>
                    <div className='title'>
                        <h1>Nueva Capacitacion</h1>
                    </div>
                    <div className='bodyCapacitacion'>
                        <label for='name'>Nombre:</label>
                        <input type='text' id='name' />
                        <label>Temario:</label>
                        <input  type='text'  id='temario' />
                        <div className='selectContainer'>
                            <div className='select'>
                                <label>Tipo:</label>
                                <select name='type' id='type' forms='typeform' >
                                    <option value='Anual'>Anual</option>
                                    <option value='Otra'>Otro</option>
                                </select>
                            </div>                        
                            <div className='select'>
                                <label>Certificacion:</label>
                                <select name='certification' id='certification' forms='typeform' >
                                    <option value='Si'>Si</option>
                                    <option value='No'>No</option>
                                </select>
                            </div>
                            <div className='select'>
                                <label>Fecha:</label>
                                <input type='date'/>
                            </div>
                            <div className='select'>
                                <label>Plan:</label>
                                <select name='plan' id='plan' forms='typeform' >
                                    <option value='Si'>Si</option>
                                    <option value='No'>No</option>
                                </select>
                            </div>
                            <div className='select'>
                                <label>Entrega de material:</label>
                                <select name='material' id='material' forms='typeform' >
                                    <option value='Si'>Si</option>
                                    <option value='No'>No</option>
                                </select> 
                            </div>
                        </div>                    

                        <label>Observaciones:</label>
                        <textarea name='Observations' cols="40" rows="5"/>
                        <div className='select'>
                            <label>Invitados</label>
                            <select name='guest' id='guest' forms='typeform' >
                                <option value='ejemplo'>ejemplo</option>
                                <option value='ejemplo2'>ejemplo2</option>
                                <option value='Etc'> etc</option>
                            </select>
                        </div>
                        <button type='submit' href='#'>Guardar</button>
                    </div>
                    
                </div>
        
        </React.Fragment>
          
        </div>
    );
}

export default NuevaCapacitacionForm;