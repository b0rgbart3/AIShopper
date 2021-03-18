import React from "react";
import "../App.css";
import "./Nav.css";
import Burger from "./Burger";

const Nav = () => (
  <header>
    <div className="logotype">
      ImageShoppr
      <span className="registered">&reg;</span>
    </div>
    <div className="desktopMenu">
      <ul>
        <li>Search</li>
        <li>About</li>
        <li>Login</li>
      </ul>
    </div>
    <Burger />
  </header>
);

export default Nav;
