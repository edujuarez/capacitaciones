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
            <div className="stl_ stl_02" ref={componentRef}>

                <div className="stl_view">
                    
                {datosCapacitacion.map((datosCapacitacion) => (

                    <div className="stl_05 stl_06">
                    <div className="stl_01" style={{left: "5.84em", top: "6.9057em"}}><span className="stl_07 stl_08 stl_09" style={{wordspacing:'0.0049em'}}></span>Nombre de la capacitación: {datosCapacitacion.nombre}</div>
                            <div className="stl_01" style={{left:'5.84em', top:'8.2657em'}}><span className="stl_07 stl_08 stl_09">Fecha: {moment(datosCapacitacion.fecha).format('L')}</span></div>
                            <div className="stl_01" style={{left:'21.8687em', top:'8.3117em'}}><span className="stl_10 stl_08 stl_11">Duración: {datosCapacitacion.duracion}hs</span></div>
                            <div className="stl_01" style={{left:'33.5527em', top:'8.3117em'}}><span className="stl_10 stl_08 stl_12" style={{wordspacing:'0.0045em'}}>ID Capacitación: {datosCapacitacion.idcapacitacion}</span></div>
                            <div className="stl_01" style={{left:'5.82em', top:'10.4782em'}}><span className="stl_13 stl_08 stl_14" style={{wordspacing:'-0.002em'}}>Campos a completar únicamente por Recursos Humanos</span></div>
                            <div className="stl_01" style={{left:'5.82em', top:'11.6382em'}}><span className="stl_13 stl_08 stl_15">Tipo: {datosCapacitacion.tipo}</span></div>
                            <div className="stl_01" style={{left:'21.88em', top:'11.6382em'}}><span className="stl_13 stl_08 stl_16">Modalidad: {datosCapacitacion.tipo}</span></div>
                            <div className="stl_01" style={{left:'39.89em', top:'11.6382em'}}><span className="stl_13 stl_08 stl_17">Plan: {datosCapacitacion.plan}</span></div>
                
                            <table>
                                <thead>
                                    <tr>
                                        <th>
                                            <div className="stl_01 numero" style={{ top:'14.4057em'}}><span className="stl_26 stl_08 stl_27">Nº</span></div> 
                                        </th>
                                        <th>
                                            <div className="stl_01 legajo" style={{ top:'14.4057em'}}><span className="stl_26 stl_08 stl_30">Legajo</span></div>
                                        </th>
                                        <th>
                                            <div className="stl_01 nombre" style={{ top:'14.4057em'}}><span className="stl_26 stl_08 stl_14" style={{wordspacing:'0.0021em'}}> Nombre y Apellido</span></div>

                                        </th>
                                        <th>
                                            <div className="stl_01 sector" style={{ top:'14.4057em'}}><span className="stl_26 stl_08 stl_31">Sector</span></div>
                                        </th>
                                        <th>
                                            <div className="stl_01" style={{left:'42.89em', top:'14.4057em'}}><span className="stl_26 stl_08 stl_32">Firma</span></div>
                                        </th>
                                    </tr>   
                                </thead>
                                {valores.map((valores, index) => (
                                <tbody>
                                    
                                    <tr key={index}>
                                        
                                        <td >
                                            <div className="stl_01 numero" style={{top:16+(2*index)+"em"}}><span className="stl_26 stl_08 stl_29" >{index+1} </span></div>

                                        </td>
                                        <td>
                                            <div className="stl_01 legajo" style={{top:16+(2*index)+"em"}}><span className="stl_26 stl_08 stl_29">{valores.invitadoID}</span></div>

                                        </td>
                                        <td>
                                            <div className="stl_01 nombre" style={{top:16+(2*index)+"em"}}><span className="stl_26 stl_08 stl_29">{valores.nombre}</span></div>

                                        </td>
                                        <td>
                                            <div className="stl_01 sector" style={{top:16+(2*index)+"em"}}><span className="stl_26 stl_08 stl_29">{valores.sector}</span></div>

                                        </td>
                                    </tr>
                                    </tbody>
                                    ))}                                
                                
                                
                            
                            </table>

                    <div className="stl_01" style={{left:'25.83em', top:'54em'}}><span className="stl_10 stl_08 stl_34" style={{wordspacing:'-0.0035em'}}>Firma: ______________________</span></div>
                    <div className="stl_01" style={{left:'28.4827em', top:'56em'}}><span className="stl_10 stl_08 stl_35">______________________</span></div>
                    <div className="stl_01" style={{left:'5.84em', top:'54em'}}><span className="stl_07 stl_08 stl_36" style={{wordspacing:'0.0031em'}}>Capacitador/es: ____________________________</span></div>
                    <div className="stl_01" style={{left:'12.2832em', top:'56em'}}><span className="stl_10 stl_08 stl_37">________________________________</span></div>
                    <div className="stl_01" style={{left:'5.72em', top:'62em'}}><span className="stl_10 stl_08 stl_20" style={{wordspacing:'-0.0071em'}}>Se entrega:     </span><span className="stl_10 stl_08 stl_29" style={{wordspacing:'0.4451em'}}></span><span className="stl_10 stl_08 stl_38" style={{wordspacing:'0.2201em'}}>Certificado: {datosCapacitacion.certificacion}           </span><span className="stl_10 stl_08 stl_29" style={{wordspacing:'0.6847em'}}></span><span className="stl_10 stl_08 stl_39" style={{wordspacing:'0.2186em'}}>Material: {datosCapacitacion.material}  </span><span className="stl_10 stl_08 stl_29" style={{wordspacing:'1.124em"'}}></span></div>
                    <div className="stl_01" style={{left:'5.72em', top:'64em'}}><span className="stl_10 stl_08 stl_20" style={{wordspacing:'-0.0071em'}}>Detalle: 
                    <p>{datosCapacitacion.observaciones}</p>
                    </span>
                    </div>

                    </div>))}
                </div>
                
            </div>
            <div className="buttonSection">
            <button className="printButton" onClick={handlePrint}>Imprimir registro</button>

            </div>
        </Fragment>
    )
}
export default Certification; 