import React from "react";

import Home from './Home';
import NuevaCapacitacionForm from "./nuevaCapacitacionForm";
import './styles/app.css';

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100;300&display=swap');
</style> 

function App() {
    return (
                <div className='container'>
                    <div className='title'>
                        Nuevo Asistente
                    </div>
                    <div className='body'>
                        <label>Nombre:</label>
                        <input  type='text'  id='nombre' />
                        <label>Legajo:</label>
                        <input  type='text'  id='legajo' />
                        <label>DNI:</label>
                        <input  type='text'  id='dni' />
                        <label>Cargo:</label>
                        <input  type='text'  id='cargo' />
                        <label>Sector:</label>
                        <input  type='text'  id='sector' /> 
                    </div>
                    <button type='submit' href='#'>Guardar</button>
                </div>
            );
}
export default App;