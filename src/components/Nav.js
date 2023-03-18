import React, { useEffect, useMemo, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import API from "../utils/API";
import "../App.scss";
import "./Nav.scss";
import Burger from "./Burger";
import MobileMenu from "./MobileMenu";
import { useShopprContext } from "../utils/GlobalState";
import { LOGOUT, LOGIN_FROM_LOCAL } from "../utils/actions";

const Nav = () => {
  const [mobileOpen, setMobileOpen] = useState("");
  const [state, dispatch] = useShopprContext();
  const history = useHistory();

  const user = useEffect(() => {
    if (!state.user) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        console.log("In Nav.js, retreived the user id: ", storedUser);

        dispatch({ type: LOGIN_FROM_LOCAL, user: JSON.parse(storedUser) });
        return JSON.parse(storedUser);
      }
    } else {
      return state.user;
    }
  }, []);

  // console.log("In the navbar, user:", user);

  function logout() {
    dispatch({ type: LOGOUT });
    history.push("/");
  }

  function toggleMobileMenu(e) {
    e.preventDefault();
    // console.log("toggling mobile menu");
    if (mobileOpen === "") {
      setMobileOpen("mobileMenuOpen");
    } else {
      setMobileOpen("");
    }
  }

  let loggedInUser = useMemo(() => {
    console.log("generating content: user : ", state.user);
    return (
      <>
        {state.user ? (
          <div class="loggedIn">
            Logged In as: {state.user.username}
            <div className="adminLink">
              <Link to="/admin">Admin Dashboard</Link>
            </div>
          </div>
        ) : (
          <></>
        )}
      </>
    );
  }, [state.user]);

  return (
    <>
      {loggedInUser}
      <header>
        <Link to="/">
          <div className="logo">
            AIShoppr
            <span className="registered">&reg;</span>
          </div>
        </Link>
        <div className="desktopMenu">
          <ul>
            <li>
              <Link className="navLink" to="/search">
                Search
              </Link>
            </li>
            <li>
              <Link className="navLink" to="/about">
                About
              </Link>
            </li>

            {state.user ? (
              <li onClick={logout}>
                {" "}
                <span className="pill">Logout</span>
              </li>
            ) : (
              <li>
                {" "}
                <Link className="pill" to="/login">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
        <Burger handler={toggleMobileMenu} />
      </header>
      <MobileMenu mobileOpen={mobileOpen} />
    </>
  );
};

export default Nav;
