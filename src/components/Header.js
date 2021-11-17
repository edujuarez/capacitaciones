import React from 'react';
import  ReactDOM from 'react-dom';
import './styles/header.css';
import { IoMdExit } from 'react-icons/io';
import logo from '../images/Logo.png';

class Header extends React.Component {
    render() {
        return(
            <div className="mainHeader">
                <div className="imgLogo">
                    <img src={logo} alt="Logo" />
                </div>
                <div className='title'>
                    <h1>Capacitaciones Iselin</h1>
                </div>
                <a href="#" className='exitContainer'>
                    <div>
                        <h1>
                            Salir
                        </h1>
                    </div>
                    <div className='iconContainer'>
                        <IoMdExit  className='iconExit'/>
                    </div>
                </a>

            </div>
        )

    }


}
export default Header;