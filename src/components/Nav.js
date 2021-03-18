import React, {useState} from "react";
import { Link } from "react-router-dom";
import "../App.css";
import "./Nav.css";
import Burger from "./Burger";
import MobileMenu from "./MobileMenu";


const Nav = () => {
    const [mobileOpen, setMobileOpen] = useState('');

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
            <Link to="/"><div className="logo">
                ImageShoppr
                <span className="registered">&reg;</span>
            </div></Link>
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
            <MobileMenu mobileOpen={mobileOpen}/>
        </>
        );
    }

export default Nav;
