import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Menu from './Menu';
import NuevaCapacitacionForm from './nuevaCapacitacionForm';

import './styles/layout.css'

import { Fragment } from 'react';

function Layout (props) {
    return (
            <React.Fragment>
                    <div className='main'>
                        <Header />
                            <div className='body'>          
                                <Menu user={props.user}/>
                                <div className='mainBoard'>
                                    {props.children}
                                </div>
                            </div>
                        <Footer />
                    </div>
        </React.Fragment>)
    }
export default Layout;