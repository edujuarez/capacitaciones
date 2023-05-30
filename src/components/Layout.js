import React, { useEffect, useState } from 'react';

import Header from './Header';
import Footer from './Footer';
import Menu from './Menu';

import './styles/layout.css'

function Layout(props) {
    const [value, setValue] = useState('');

    useEffect(() => {
        setValue(localStorage.getItem('name'))
    })


    return (
        <React.Fragment>
            <div className='main'>
                <Header />
                <div className='body'>
                    <Menu user={!value ? 'Usuario' : value} />
                    <div className='mainBoard'>
                        {props.children}
                    </div>
                </div>
            </div>
            <Footer />
        </React.Fragment>)
}
export default Layout;