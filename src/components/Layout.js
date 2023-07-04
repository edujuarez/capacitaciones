import React, { useEffect, useState } from 'react';

import Header from './Header';
import Footer from './Footer';
import Menu from './Menu';
import { auth } from './googleSignIn/config';

import './styles/layout.css'
import { getAuth } from 'firebase/auth';

function Layout(props) {
    const [user, setUser] = useState('');
    const [photo, setPhoto] = useState('');
    const auth = getAuth();
    const current = auth.currentUser;
    console.log(auth.currentUser)
    /*if (auth.currentUser) {
        setUser(auth.currentUser)
    } 
        const auth = getAuth()
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const uid = user.uid;
                // ...
            } else {
                // User is signed out
                // ...
            }
        });*/

    return (
        <React.Fragment>
            <div className='main'>
                <Header />
                <div className='body'>
                    <Menu user={!props.user ? 'Usuario' : props.user} photo={photo} />
                    <div className='mainBoard'>
                        {props.children}
                    </div>
                </div>
            </div>
            <Footer />
        </React.Fragment>)
}
export default Layout;