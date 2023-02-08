import React, { Component, Fragment, useRef } from "react";
import './styles/certification.css'
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ReactToPrint, useReactToPrint } from 'react-to-print';
import moment from 'moment';
import 'moment/locale/es';
import logoIselin from '../images/iselin.jpg';



function Certification() {
    //Traemos valores de la capacitacion segun idcapacitacion
    const params = useParams();
    let idcapacitacion = params.idcapacitacion;
    const  [valores, setValores ] = useState([
    ]);
    useEffect(() => {
        let urlValores = `https://servercapacitaciones-production.up.railway.app/addasistentes/${idcapacitacion}`;
        fetch(urlValores)
        .then(res => {
            return res.json();
        })
        .then(data => {
            setValores(data)
        })
    }, []);
        //Trae datos de la capacitacion solicitada
        const  [datosCapacitacion, setdatosCapacitacion ] = useState([]);
        useEffect(() => {
            let url = `https://servercapacitaciones-production.up.railway.app/capacitaciones/${idcapacitacion}`;
            fetch(url)
            .then(res => {
                return res.json();
            })
            .then(data => {
                setdatosCapacitacion(data);
            })
        }, []);

        //configura el boton de imprimir para guardar PDF
        const componentRef = useRef();
        const handlePrint = useReactToPrint({
            content: () => componentRef.current,
        });
    return (
        <Fragment>
            <section ref={componentRef}>                    
                {datosCapacitacion.map((datosCapacitacion) => (
                    <div>
                        <table border="1" bordercolor="white">
                        <thead>
                            <tr className='primerTitulo'>
                                <th>SGI</th>
                                <th>CÓDIGO</th>
                                <th>TÍTULO</th>
                                <th>PROCESO</th>
                                <th>REV</th>
                            </tr>
                            <tr className='segundoTitulo'>
                                <th><img src={logoIselin}></img></th>
                                <th>R-GRH 06-1</th>
                                <th>REGISTRO DE CAPACITACIONES</th>
                                <th>GESTIÓN DEL RECURSO HUMANO</th>
                                <th>1</th>
                            </tr>
                            <tr className=''>
                                <th colSpan="2">Nombre de la capacitación:</th>
                                <th colSpan="3">{datosCapacitacion.nombre}</th>
                            </tr>
                            <tr>
                                <th>Fecha: {moment(datosCapacitacion.fecha).format('L')}</th>
                                <th></th>
                                <th>Duración: {datosCapacitacion.duracion}hs</th>
                                <th>ID Capacitación: {datosCapacitacion.idcapacitacion}</th>
                                <th></th>
                            </tr>
                            <tr>
                                <th colSpan="4">Campos a completar únicamente por Recursos Humanos</th>
                            </tr>
                            <tr>
                                <th colSpan="2">Tipo: {datosCapacitacion.tipo}</th>
                                <th>Modalidad: {datosCapacitacion.modalidad}</th>
                                <th>Plan: {datosCapacitacion.plan}</th>
                            </tr>
                        </thead>
                    </table>
                            <table border="1">
                                <thead>
                                    <tr>
                                        <th>Nº</th>
                                        <th>Legajo</th>
                                        <th>Nombre y Apellido</th>
                                        <th>Sector</th>
                                        <th>Firma</th>
                                    </tr>   
                                </thead>
                            {valores.map((valores, index) => (
                                <tbody className='segundoTitulo'>
                                    <tr key={index}>
                                        <td >{index+1}</td>
                                        <td>{valores.invitadoID}</td>
                                        <td>{valores.nombre}</td>
                                        <td>{valores.sector}</td>
                                        <td></td>
                                    </tr>
                                    </tbody>
                                    ))}
                            </table>
                            <div className="footerSection">
                                <div>Capacitador/es: </div>
                                <div>Firma: ______________________</div>
                            </div>
                            <div className="footerSection">
                                <div>Se entrega: Certificado: {datosCapacitacion.certificacion} </div>
                                <div> Material: {datosCapacitacion.material}</div>
                            </div>
                            <div className="footerSection">Observaciones: {datosCapacitacion.observaciones}</div>
                    </div>))}                
            </section>
            <div className="buttonSection">
                <button className="printButton" onClick={handlePrint}>Imprimir registro</button>
            </div>
            <h1><a type='submit' href={`/capacitaciones/` + idcapacitacion}>Volver  </a></h1>

        </Fragment>
    )
}
export default Certification; 