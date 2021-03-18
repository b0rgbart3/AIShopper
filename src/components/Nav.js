import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import "./Nav.css";
import Burger from "./Burger";

const Nav = () => (
  <header>
    <div className="logo">
      ImageShoppr
      <span className="registered">&reg;</span>
    </div>
    <div className="desktopMenu">
      <ul>
        <li><Link className="navLink">Search</Link></li>
        <li><Link className="navLink">About</Link></li>
        <li><Link className='pill'>Login</Link></li>
      </ul>
    </div>
    <Burger />
  </header>
);

export default Nav;
