import React from 'react';
import './styles/header.css';
import logo from '../images/Logo.png';
import LogOut from './googleSignIn/LogOut';
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
                    <LogOut />
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