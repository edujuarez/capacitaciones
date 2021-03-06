import React from "react";
import { useState, useEffect, Fragment } from "react";
import './styles/capacitacionView.css';
import { useParams } from "react-router-dom";
import axios from 'axios';


<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100;300&display=swap');
</style> 

function CapacitacionView() {
    const params = useParams();
    let idcapacitacion = params.idcapacitacion;

    const  [capacitacion, setCapacitacion ] = useState([]);
    useEffect(() => {
        let url = `https://capacitacionesiselin.herokuapp.com/capacitaciones/${idcapacitacion}`;
        fetch(url)
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data);
            setCapacitacion(data);
        })
    }, []);

    const deleteSubmit = (capacitacionID) => {
       let deleteURL = `https://capacitacionesiselin.herokuapp.com/capacitaciones/${capacitacionID}/delete`
        axios.delete(deleteURL)
        .then(response => {
            if(response.data != null) {
                alert("La capacitacion fue borrada correctamente!");
                location.href = '/capacitaciones'
            }
        })
    };
    return (
        <React.Fragment>
        <div className='container_capacitacionView'>
            <div className='mainTittle'>
                <h1> Detalle</h1>
                <h1><a type='submit' href='/capacitacion'>Volver</a></h1>
            </div>
            {capacitacion.map((capacitacion) => (
                <div className='bodyCapacitacionView'  key={capacitacion.idcapacitacion}>
                    <label>Nombre de capacitacion:</label>
                    <p className='campo'name='nombre'>{capacitacion.nombre}</p>
                    <label>Temario:</label>
                    <p className='campo' >{capacitacion.temario}</p>
                    <div className='selectContainer'>
                        <div className='select'>
                            <label>Tipo:</label>
                            <p className='campo'>{capacitacion.tipo}</p>
                        </div>                        
                        <div className='select'>
                            <label>Certificacion:</label>
                            <p className='campo'>{capacitacion.certificacion}</p>
                        </div>
                        <div className='select'>
                            <label>Fecha:</label>
                            <p className='campo'>{ capacitacion.fecha }</p>
                        </div>
                        <div className='select'>
                            <label>Plan:</label>
                            <p className='campo'>{capacitacion.plan}</p>
                        </div>
                        <div className='select'>
                            <label>Entrega de material:</label>
                            <p className='campo'>{capacitacion.material}</p>
                        </div>
                    </div>                    

                    <label>Observaciones: numero{idcapacitacion}</label>
                    <div className='textarea'>
                        <p >{capacitacion.observaciones}</p>
                    </div>
                    <label>Invitados</label>
                    <div className='invitados'>
                            {/*aqui va un .map*/}
                        <p className='campo'></p>
                        <p className='campo'>Chofer 2</p>
                        <p className='campo'>Chofer 3</p>
                        <p className='campo'>Chofer 4</p>
                    </div>
                    <div className="buttonsCapacitaciones">
                        <button type='submit' href='/capacitacion'>Editar</button>
                        <button onClick={() => {deleteSubmit(idcapacitacion)}}>Eliminar</button>
                    </div>
                        
                
        
                </div> 
            ))}     
   </div>

</React.Fragment>
    );
}
export default CapacitacionView;