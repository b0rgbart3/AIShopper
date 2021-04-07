import React, {useState} from "react";
import { Link } from "react-router-dom";
import "../App.scss";
import "./Nav.scss";
import Burger from "./Burger";
import MobileMenu from "./MobileMenu";
import { useShopprContext } from "../utils/GlobalState";
import { LOGIN, LOADING, STOP_LOADING, LOGOUT } from "../utils/actions";


const Nav = () => {
    const [mobileOpen, setMobileOpen] = useState('');
    const [state, dispatch] = useShopprContext();

    let user = state.user;
    console.log("In the navbar, user:", user);
    
function logout() {
    dispatch({ type: LOGOUT });
}

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
             
                { user ? (  <div className='loggedIn'> <li className='loggedInUser'>Logged In as:{user.username}</li> <li onClick={logout}> <span className="pill">Logout</span></li></div>):
                (     <li > <Link className="pill" to="/login">Login</Link></li>)}
                 
               
                </ul>
            </div>
            <Burger handler={toggleMobileMenu}/>
            </header>
            <MobileMenu mobileOpen={mobileOpen}/>
        </>
        );
    }

export default Nav;
