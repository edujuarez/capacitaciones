import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Menu from './Menu';
import NuevaCapacitacionForm from './NuevaCapacitacionForm';
import NuevoAsistente from './NuevoAsistente';

import './styles/home.css'

import { Fragment } from 'react';

function Layout (props) {
    const children = props.children;
    return (
            <React.Fragment>
                    <div className='main'>
                        <Header />
                        <div className='body'>
                            <Menu user="polo"/>
                            <div className='mainBoard'>
                                <NuevoAsistente/>
                                <NuevaCapacitacionForm/>
                            </div>
                        </div>
                        <Footer />
                    </div>
        </React.Fragment>)}
export default Layout;