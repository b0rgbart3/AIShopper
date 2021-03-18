import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import "./Nav.css";

const MobileMenu = (props) => {
  return (
    <>
      <div className={`mobileMenu ${props.mobileOpen}`}>
        <ul>
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
    </>
  );
};

export default MobileMenu;
