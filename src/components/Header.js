import React from 'react';
import './styles/header.css';
import logo from '../images/Logo.png';
import { getAuth, signOut } from "firebase/auth";
import { useHistory } from 'react-router-dom';


class Header extends React.Component {
    render() {
        const auth = getAuth();
        const LogOut = () => {
            ('click')
            signOut(auth).then(() => {
                // Sign-out successful.

            }).catch((error) => {
                window.alert(error)
            });
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
                    <button className="exitContainer" onClick={(e) => LogOut()}>Salir</button>
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