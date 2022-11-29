import React from 'react';
import ReactDOM from 'react-dom';
import './styles/footer.css';

class Footer extends React.Component {
    render() {
        return (
            <div className='mainFooter'>
               <p>Made with ❤ by <a href="https://linkedin.com/in/eduardo--juarez/" target='blank'>@edukj_</a></p>
                <p> ***Version Beta 1.9.9*** Informes e historial de capacitaciones agregados ***</p>
            </div>
        )
    }
}
export default Footer;