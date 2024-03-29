import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './config';
import { useHistory } from 'react-router-dom'
import './login.css'
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Mentor from "../../../src/images/Mentor 01.png"

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const history = useHistory();
    //login con usuario y contrasenia
    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                history.push('/home');
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage)
            });
    }
    //inicio con Google account 
    //IMPORTANTE BOTON INICIAR SESION COMENTADO

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        auth.useDeviceLanguage(); // set browser language

        signInWithPopup(auth, provider)
            .then((result) => {
                // write code to perform intended task
                // like redirect user somewhere else after sign-in
                // ...
                // ...
                // The signed-in user info.
                const user = result.user;
                /*

                // ...
                */
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                history.push('/home');

            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                window.alert(error)
                // ...
            });
    };


    return (
        <section className='loginSection'>
            <img src={Mentor} alt="Logo mentor" />
            <div className='card'>
                <form>
                    <h1>Iniciar Sesión</h1>
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
                            autoComplete="username"

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
                            autoComplete="current-password"
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
                {/*<div>
                    <button onClick={signInWithGoogle}>Continuar con Google</button>
    </div>*/}
            </div>
        </section>
    )
}

export default Login