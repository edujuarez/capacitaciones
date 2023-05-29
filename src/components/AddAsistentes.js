import React, { useState, useEffect } from "react";
import axios from 'axios';
import Multiselect from 'multiselect-react-dropdown';
import { useParams } from "react-router-dom";
import moment from 'moment';
import 'moment/locale/es';

import './styles/addAsistentes.css'



function AddAsistentes() {

    const params = useParams();
    let idcapacitacion = params.idcapacitacion;

    //Traigo capacitacion en cuestion
    const [capacitaciones, setCapacitaciones] = useState([{
        'categoria': "",
        'certificacion': "",
        'duracion': "",
        'eliminado': "",
        'fecha': "",
        'idcapacitacion': "",
        'material': "",
        'modalidad': "",
        'nombre': "",
        'observaciones': "",
        'plan': "",
        'temario': "",
        'tipo': "",
        'capacitador': "",
        'linkQR': ""
    }]);
    let url = `https://servercapacitaciones-production.up.railway.app/capacitaciones/${idcapacitacion}`;
    useEffect(() => {
        fetch(url)
            .then(res => {
                return res.json();
            })
            .then(data => {
                setCapacitaciones(data);
                console.log(capacitaciones)
            })
    }, []);


    //traigo asistentes cargados anteriormente
    const [selectedValues, setSelectedValues] = useState([]);

    useEffect(() => {
        fetch(`https://servercapacitaciones-production.up.railway.app/addasistentes/${idcapacitacion}`)
            .then(res => {
                return res.json();
            })
            .then(data => {
                setSelectedValues(data);
                console.log(selectedValues)
            })
    }, []);


    //traigo lista de asistentes y entran a multiselect

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
    //mapeo asistentes en objeto para Multiselect
    const asistentesOptions = asistentes.map((asistentes) => (
        //asistentes.legajo + ' - ' + asistentes.nombre
        {
            'capacitacionID': idcapacitacion,
            'nombre': asistentes.nombre,
            'nombreview': asistentes.legajo + " - " + asistentes.nombre,
            'invitadoID': asistentes.legajo,
            'asistencia': true,
            'sector': asistentes.sector,
            'puntaje': "Sin cargar",
            'eliminado': 0,
            'nombreCapacitacion': (JSON.stringify((capacitaciones[0].nombre))).slice(1).slice(0, -1),
            'fecha': moment(capacitaciones[0].fecha).format('L'),
            'capacitador': capacitaciones.capacitador,
            'linkQR': capacitaciones.linkQR

        }))

    const [selectedItems, setSelectedItems] = useState("");
    function onSelect(e) {
        setSelectedItems(e)
        console.log("elementos agregados ")
        console.log(selectedItems)
    }
    const [removedItems, setRemovedItems] = useState('');
    function onRemove(e) {
        setRemovedItems(e)
        console.log(removedItems)
    }

    const addAsistentesURL = "https://servercapacitaciones-production.up.railway.app/addasistentes"
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(selectedItems)
        axios.post(addAsistentesURL, selectedItems).then(() => {
            console.log(selectedItems)
            alert([`Los asistentes fueron cargados correctamente!`]);
            window.location.href = `/capacitaciones/${idcapacitacion}`;
        });
    }

    return (
        <React.Fragment>
            <div className='container_nuevaCapacitacion'>
                <div className='mainTittle'>
                    <h1>Agregar asistentes</h1>
                    <h1><a type='submit' href={`/capacitaciones/` + idcapacitacion}>Volver  </a></h1>
                </div>
                <form className='bodyCapacitacion' type='submit'>
                    <div>
                        <p>Nombre capacitación</p>
                        {capacitaciones.map((capacitacion) => (
                            <div name='capacitacionID' form="typeform" key={capacitacion.idcapacitacion}>
                                <p className="campo" value="idcapacitacion" >{capacitacion.nombre}</p>
                            </div>
                        ))}
                    </div>
                    <div>
                        <p>Asistentes</p>
                        <Multiselect
                            options={asistentesOptions} // Options to display in the dropdown
                            onSelect={onSelect}
                            onRemove={onRemove} // Function will trigger on remove event
                            placeholder="Buscar..." // Property name to display in the dropdown options
                            isObject={true}
                            selectedValues={selectedValues}
                            displayValue="nombreview"
                            showArrow
                        />
                    </div>
                    <button type="submit" onClick={handleSubmit}>Terminar</button>
                </form>

            </div>

        </React.Fragment>
    );
}
export default AddAsistentes