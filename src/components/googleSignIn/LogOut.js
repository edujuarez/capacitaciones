
import React from 'react';
import { IoMdExit } from 'react-icons/io';



function LogOut() {
    const handleClick = () => {
        localStorage.clear()
        window.location.href = `/asistentes`;


    }
    return (
        <button onClick={handleClick}>
            <IoMdExit className='iconExit' />

        </button>
    );
};

export default LogOut;