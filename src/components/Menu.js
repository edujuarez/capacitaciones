import React from 'react';

import './styles/Menu.css';
import { BsSearch } from 'react-icons/bs';
import { BsBook } from 'react-icons/bs';
import { AiOutlineUser } from 'react-icons/ai';
import { CgNotes } from 'react-icons/cg';
import { IoPersonCircleOutline } from 'react-icons/io5';

class Menu extends React.Component {
    render(){

        return (
            <div className='Menu'>
                <div className='profileMenu'>
                    <IoPersonCircleOutline className='profileIcon'/>
                    <h1>Hola, {this.props.user}!</h1>
                </div>
                <a className="SubMenu" href="/capacitacion">
                    <BsBook className='icon'/>
                    <h1>Capacitaciones</h1>
                </a>
                <a className='SubMenu' href="/asistentes">
                    <AiOutlineUser className='icon'/>
                    <h1>Asistentes</h1>
                </a>
                <a className='SubMenu' href="/certification">
                    <CgNotes className='icon'/>
                    <h1>Certificados</h1>
                </a>
                <a className='SubMenu' href="/capacitacionview">
                    <BsSearch  className='icon'/>
                    <h1>Buscar</h1>
                </a>
            </div>
        )}
    }

export default Menu;