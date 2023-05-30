import React, { useEffect, useState } from 'react';
import { auth, provider } from './config'
import { signInWithPopup } from 'firebase/auth';


function Login() {
    const [value, setValue] = useState('');
    const handleClick = () => {
        signInWithPopup(auth, provider).then((data) => {
            setValue(data.user.displayName)
            localStorage.setItem("name", data.user.displayName)
        })
    }
    useEffect(() => {
        setValue(localStorage.getItem('name'))
    })
    return (
        <div>
            <button onClick={handleClick}>Ingresar con Google</button>
        </div>
    );
};

export default Login;
