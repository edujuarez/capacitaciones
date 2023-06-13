import React, { useContext, useState } from 'react';
import { auth, googleProvider } from './config'
import { UserAuth, AuthContextProvide } from '../context/AuthContext'
import { signInWithPopup } from 'firebase/auth';
import '../styles/login.css';
import { useHistory } from 'react-router-dom';




function Login() {

    const handleClick = () => {

    }

    return (
        <div className='loginBackground'>
            <div className='title'>
                <h1 className='mainTittleLogin'>Bienvenido a Mentor</h1>
                <h1 className='mainTittleLogin'>Sistema de capacitaciones</h1>
            </div>
            <section className='loginSection'>
                <div className='title'>
                    <h1 className='mainTittleLogin'>Iniciar Sesión</h1>
                    <div className='buttonLogin'>
                        <button onClick={handleClick()}>Ingresar con Google</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;
