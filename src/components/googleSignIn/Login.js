import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './config';
import { useHistory } from 'react-router-dom'
import './login.css'
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

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
                console.log(user); // Provides user data as Object.
                console.log(user.displayName); // User's display name.
                console.log(user.email); // User's. Email ID.
                console.log(user.phoneNumber); // User's phone number
                console.log(user.photoURL); // User's photo URL
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
                            autocomplete="username"

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
                            autocomplete="current-password"
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
                {<div>
                    <button onClick={signInWithGoogle}>Entrar con Google</button>
                </div>}
            </div>
        </section>
    )
}

export default Login