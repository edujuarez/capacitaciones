import React from 'react';
import ReactDOM from 'react-dom';

import './styles/CapacitacionesDefault.css';

import Capacitacion from './Capacitacion';


function CapacitacionesDefault() {
    
        return(
            <React.Fragment>
                <div className='mainBoard'>
                    <div className='mainTitle'>
                        <h1>
                            Proximas capacitaciones
                        </h1>
                    </div>
                    <Capacitacion date='01/01/2021' name='Capacitacion HyS'/>
                    <Capacitacion date='01/01/2021' name='Capacitacion HyS'/>
                    <Capacitacion date='01/01/2021' name='Capacitacion HyS'/>
                    <Capacitacion date='01/01/2021' name='Capacitacion HyS'/>   
                </div>
            </React.Fragment>
        )
    }

export default CapacitacionesDefault;