import React from 'react';
import { Link } from "react-router-dom";
import './Footer.css';

const Footer = (props) => {
    return (
        <footer>
        <div className='footerCol'>
            <div className='footerLogo'>ImageShoppr<span className='registered'>®</span></div>
            <p>The smartest shopping search engine.</p>
            
            <p className='copyright'>© 2021 Bart Dority</p>
        </div>
        <div className='footerCol'>
            <ul>
            <Link className="" to="/">
                <li>Home</li>
            </Link>
            <Link className="" to="/search">
                <li>Search</li>
            </Link>
            <Link className="" to="/about">
                <li>About</li>
            </Link>
            <Link className="" to="/login'">
                <li>Login</li>
            </Link>
            </ul>
        </div>

        </footer>
    );
    
}

export default Footer;