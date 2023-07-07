import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Menu from './Menu';
import { getAuth } from 'firebase/auth';

import './styles/layout.css'

function Layout(props) {
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