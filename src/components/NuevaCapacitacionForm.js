import React, { useState, useEffect} from "react";
import axios from 'axios';
import Multiselect from 'multiselect-react-dropdown';


import './styles/nuevaCapacitacionForm.css';

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100;300&display=swap');
</style> 

function  NuevaCapacitacionForm(){
    
        const [selectedItems, setItems] = useState("");

        const [asistentes, setAsistentes] = useState([]);
            useEffect(() => {
                fetch("https://capacitacionesiselin.herokuapp.com/asistente")
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    setAsistentes(data);
                })
        }, []);
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
        const capacitacionURL = "https://capacitacionesiselin.herokuapp.com/capacitaciones/nuevo"
        const asistentesURL = "https://capacitacionesiselin.herokuapp.com/cronograma/nuevo"
        const handleSubmit = (e) => {
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
                asistentes : selectedItems
            }).then (() => {
                alert([`La capacitacion ${value.nombre} fue creada correctamente!`]);
                
            })
            /*axios.post(asistentesURL, {
                nombre : `${value.nombre}`,
                idnombre : `${value.temario}`,
                asistentes.map((asistentes) => (
                    idasistente = asistentes.legajo
                   ))
                
                
                idasistente : `${value.tipo}`,
            })*/
        }
        const asistentesOptions = asistentes.map((asistentes) => (
         asistentes.legajo + " - " + asistentes.nombre
        ))

        function onSelect(e) {
            setItems(...selectedItems, e)
            console.log(selectedItems)
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
                                <select name='tipo' forms='typeform' onChange={handleChange} >
                                    <option value='Seleccionar'>Seleccionar</option>
                                    <option value='Desarrollo'>Desarrollo</option>
                                    <option value='Preventiva'>Preventiva</option>
                                    <option value='Correctiva'>Correctiva</option>
                                </select>
                            </div>                        
                            <div className='select'>
                                <label>Certificacion:</label>
                                <select name='certificacion' forms='typeform' onChange={handleChange} >
                                    <option value='Seleccionar'>Seleccionar</option>
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
                                    <option value='Seleccionar'>Seleccionar</option>
                                    <option value='Si'>General</option>
                                    <option value='HyS'>Higiene y Seguridad</option>
                                    <option value='Otro'>Otro</option>
                                </select>
                            </div>
                            <div className='select'>
                                <label>Entrega de material:</label>
                                <select name='material' forms='typeform' onChange={handleChange} >
                                    <option value='Seleccionar'>Seleccionar</option>
                                    <option value='Si'>Si</option>
                                    <option value='No'>No</option>
                                </select> 
                            </div>
                        </div>
                        <label>Observaciones:</label>
                        <textarea name='observaciones' cols="40" rows="5" onChange={handleChange}/>
                        <div className="multiselect">
                            <label>Asistentes</label>
                            <Multiselect
                                name="selectedAsistentes"
                                options={asistentesOptions} // Options to display in the dropdown
                                onSelect={(e) => {onSelect(e)}} // Function will trigger on select event
                                onRemove={(e) => {console.log(e)}} // Function will trigger on remove event
                                displayValue="name" // Property name to display in the dropdown options
                                isObject={false}
                            />
                        </div>

                        <button type="submit" onClick={handleSubmit}>Guardar</button>     
                    </form>
                   
                </div>
        
        </React.Fragment>
    );
}

export default NuevaCapacitacionForm;