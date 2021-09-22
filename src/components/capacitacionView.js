import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Home from './Home';
import NuevaCapacitacionForm from "./nuevaCapacitacionForm";
import './styles/app.css';

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100;300&display=swap');
</style> 

function App() {
    return (
        <BrowserRouter>
        <div className='container'>
            <div className='title'>
                Nueva Capacitacion
            </div>
            <div className='body'>
                <label for='name'>Nombre de capacitacion:</label>
                <p className='campo'>Capacitacion ante siniestro de Higiene y Seguridad</p>
                <label>Temario:</label>
                <p className='campo'>Como actuar y a quien llamar ante un siniestro</p>
                <div className='selectContainer'>
                    <div className='select'>
                        <label>Tipo:</label>
                        <p className='campo'>Anual</p>
                    </div>                        
                    <div className='select'>
                        <label>Certificacion:</label>
                        <p className='campo'>No</p>
                    </div>
                    <div className='select'>
                        <label>Fecha:</label>
                        <p className='campo'>10/03/2021</p>
                    </div>
                    <div className='select'>
                        <label>Plan:</label>
                        <p className='campo'>Si</p>
                    </div>
                    <div className='select'>
                        <label>Entrega de material:</label>
                        <p className='campo'>Si</p>
                    </div>
                </div>                    

                <label>Observaciones:</label>
                <div className='textarea'>
                    <p >Se realiza capacitacion de parte de HyS a chofer sobre como actuar en un siniestro si hubiera pasajeros heridos</p>
    
                </div>
                <label>Invitados</label>
                <div className='invitados'>

                    <p className='campo'>Chofer 1</p>
                    <p className='campo'>Chofer 2</p>
                    <p className='campo'>Chofer 3</p>
                    <p className='campo'>Chofer 4</p>
                </div>
                <button type='submit' href='#'>Guardar</button>
            </div>
            
        </div>

</BrowserRouter>
    );
}
export default App;