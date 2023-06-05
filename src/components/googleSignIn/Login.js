import React, { useEffect, useState } from 'react';
import { auth, provider } from './config'
import { signInWithPopup } from 'firebase/auth';
import '../styles/login.css';



function Login() {
    const [value, setValue] = useState('');
    const handleClick = () => {
        signInWithPopup(auth, provider).then((data) => {
            setValue(data.user.displayName)
            localStorage.setItem("name", data.user.displayName)
            window.location.href = `/capacitacion`;
        })
    }
    useEffect(() => {
        setValue(localStorage.getItem('name'))
    })
    return (
        <div className='loginBackground'>
            <div className='title'>
                <h1 className='mainTittle'>Bienvenido a Mentor</h1>
                <p className='mainTittle'>Sistema de capacitaciones</p>
            </div>
            <section className='loginSection'>
                <div>
                    <h1 className='mainTittle'>Iniciar Sesión</h1>
                    <button className='buttonLogin' onClick={handleClick}>Ingresar con Google</button>
                </div>

            </section>
        </div>
    );
};

export default Login;
