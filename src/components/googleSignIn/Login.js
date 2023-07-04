import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './config';
import { NavLink, Redirect, useHistory } from 'react-router-dom'
import './login.css'
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const history = useHistory();
    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user.email);

                history.push('/home');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage)
                console.log(errorCode, errorMessage)
            });
    }

    return (
        <section className='loginSection'>
            <div className='card'>
                <h1> Mentor </h1>
                <h1> Sistema de capacitaciones </h1>
                <form>
                    <div className='inputLogin'>
                        <label htmlFor="email-address">
                            Email:
                        </label>
                        <input
                            id="email-address"
                            name="email"
                            type="email"
                            required
                            placeholder="Ingrese email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className='inputLogin'>
                        <label htmlFor="password">
                            Contraseña:
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            placeholder="Contraseña"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className='buttonLogin'>
                        <button
                            onClick={onLogin}
                        >
                            Entrar
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Login