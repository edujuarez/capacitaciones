
import React from 'react';
import { IoMdExit } from 'react-icons/io';



function LogOut() {
    //limpia el cache con el nombre de usuario obtenido de google y te envia a la pagina para registrarte
    const handleClick = () => {
        localStorage.clear()
        window.location.href = `/login`;
    }
    return (
        <button onClick={handleClick}>
            <IoMdExit className='iconExit' />

        </button>
    );
};

export default LogOut;