import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import { auth, provider } from './config'
import { SignInMethodPopup, signInWithPopup } from 'firebase/auth';
import Capacitacion from '../Capacitacion';
import App from '../App';
import Layout from '../Layout';


function Login() {
    const [value, setValue] = useState('');
    const handleClick = () => {
        signInWithPopup(auth, provider).then((data) => {
            setValue(data.user.email)
            localStorage.setItem("email", data.user.email)
        })
    }

    useEffect(() => {
        setValue(localStorage.getItem('email'))
    })

    return (
        <div>
            {value ? <Layout /> :
                <button onClick={handleClick}>Ingresar con Google</button>}
        </div>
    );
};

export default Login;
