import React from 'react';
import './styles/header.css';
import { IoMdExit } from 'react-icons/io';
import logo from '../images/Logo.png';
import { Redirect } from 'react-router-dom';

class Header extends React.Component {
    render() {
        const logout = () => {
            localStorage.clear()

        }
        return (
            <>
                <div className="mainHeader">
                    <div className="imgLogo">
                        <img src={logo} alt="Logo" />
                    </div>
                    <div className='title'>
                        <h1>Mentor Iselín</h1>
                    </div>
                    <button className='exitContainer' onClick={logout}>
                        <div>
                            <h1>
                                Salir
                            </h1>
                        </div>
                        <div className='iconContainer'>
                            <IoMdExit className='iconExit' />
                        </div>
                    </button>
                </div>
                <div className="mainHeader2">
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