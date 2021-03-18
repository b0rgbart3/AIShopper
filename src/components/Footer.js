import React from 'react';
import './Footer.css';

const Footer = (props) => {
    return (
        <footer>
        <div className='footerLogo'>ImageShoppr<span className='registered'>®</span></div>
        <p>The smartest shopping search engine.</p>
        
        <p className='copyright'>© 2021 ImageShoppr</p>
        </footer>
    );
    
}

export default Footer;