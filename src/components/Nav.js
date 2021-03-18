import React, {useState} from "react";
import { Link } from "react-router-dom";
import "../App.css";
import "./Nav.css";
import Burger from "./Burger";


const Nav = () => {
    const [mobileOpen, setMobileOpen] = useState('phase2');

function toggleMobileMenu(e) {
    e.preventDefault();
    console.log("toggling mobile menu");
    if (mobileOpen === '') {
        setMobileOpen('mobileMenuOpen');
    } else {
        setMobileOpen('');
    }
}
    return (
        <>
            <header>
            <div className="logo">
                ImageShoppr
                <span className="registered">&reg;</span>
            </div>
            <div className="desktopMenu">
                <ul>
                <li>
                    <Link className="navLink" to="/search">Search</Link>
                </li>
                <li>
                    <Link className="navLink" to="/about">About</Link>
                </li>
                <li>
                    <Link className="pill" to="/login">Login</Link>
                </li>
                </ul>
            </div>
            <Burger handler={toggleMobileMenu}/>
            </header>
            <div className={`mobileMenu ${mobileOpen}`}>
            <ul>
                <li>
                <Link className="navLink" to="/search">Search</Link>
                </li>
                <li>
                <Link className="navLink" to="/about">About</Link>
                </li>
                <li>
                <Link className="pill" to="/login'">Login</Link>
                </li>
            </ul>
            </div>
        </>
        );
    }

export default Nav;
