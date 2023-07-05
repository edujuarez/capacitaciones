import React, { useEffect, useState } from 'react';

import Header from './Header';
import Footer from './Footer';
import Menu from './Menu';
import { auth } from './googleSignIn/config';

import './styles/layout.css'
import { getAuth } from 'firebase/auth';

function Layout(props) {
    const auth = getAuth();
    return (
        <React.Fragment>
            <div className='main'>
                <Header />
                <div className='body'>
                    <Menu user={!props.user ? 'Usuario' : props.user} photo={props.photo} />
                    <div className='mainBoard'>
                        {props.children}
                    </div>
                </div>
            </div>
            <Footer />
        </React.Fragment>)
}
export default Layout;