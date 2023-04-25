import React from 'react';
import './styles/footer.css';

class Footer extends React.Component {
    render() {
        return (
            <div className='mainFooter'>
                <p>Made with ❤ by <a href="https://linkedin.com/in/eduardo--juarez/" target='blank'>@edukj_</a></p>
                <p> ***Version Beta 3.4.1***</p>
            </div>
        )
    }
}
export default Footer;