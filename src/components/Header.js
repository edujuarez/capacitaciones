import React from 'react';
import './styles/header.css';
import { IoMdExit } from 'react-icons/io';
import logo from '../images/Logo.png';

class Header extends React.Component {
    render() {
        return (
            <>
                <div className="mainHeader">
                    <div className="imgLogo">
                        <img src={logo} alt="Logo" />
                    </div>
                    <div className='title'>
                        <h1>Mentor Iselín</h1>
                    </div>
                    <a href="#" className='exitContainer'>
                        <div>
                            <h1>
                                Salir
                            </h1>
                        </div>
                        <div className='iconContainer'>
                            <IoMdExit className='iconExit' />
                        </div>
                    </a>
                </div>
                <div className="mainHeader">
                    <a href="/capacitacion"><h1>Capacitaciones</h1></a>
                    <a href="/asistentes"><h1>Asistentes</h1></a>
                    <a href="/informes"><h1>Informe de capacitación</h1></a>
                    <a href="/historial"><h1>Historial por empleado</h1></a>
                </div>
            </>
        )

    }


}
export default Header;