import "./Navbar.css";
import React, { useContext } from "react";
import Logo from "../../images/Picsart_23-04-05_12-35-00-032.jpg";
import LocalMallRoundedIcon from "@mui/icons-material/LocalMallRounded";
import { NavLink, Link } from "react-router-dom";
import cookie from "react-cookies";
import { isLoggedIn } from "../../App";

function Navbar() {
  const [loggedIn, setLoggedIn] = useContext(isLoggedIn);

  const logOut = () => {
    cookie.remove("auth_token", { path: "/" });
    cookie.remove("user", { path: "/" });
    setLoggedIn(false);
  };

  const menuButton = () => {
    document
      .getElementsByClassName("nav-container")[0]
      .classList.toggle("nav-change");
    document
      .getElementsByClassName("nav-navigation")[0]
      .classList.toggle("nav-show");
    document
      .getElementsByClassName("nav-whole-nav")[0]
      .classList.toggle("nav-vertical");
  };

  return (
    <nav className="nav-whole-nav">
      <div className="nav-logo">
        <Link className="nav-logo-title nav-link" to="/">
          <img src={Logo} width="50" height="50" alt="Square Art logo" />
          <span className="nav-title">Khizana</span>
        </Link>
      </div>
      <div className="nav-menu">
        <div className="nav-container" onClick={(e) => menuButton()}>
          <div className="nav-bar1"></div>
          <div className="nav-bar2"></div>
          <div className="nav-bar3"></div>
        </div>
        <div className="nav-navigation">
          <NavLink to="/" className="nav-link" onClick={(e) => menuButton()}>
            Home
          </NavLink>
          <NavLink
            to="/categories"
            className="nav-link"
            onClick={(e) => menuButton()}
          >
            Categories
          </NavLink>
          <NavLink
            to="/instructions"
            className="nav-link"
            onClick={(e) => menuButton()}
          >
            Instructions
          </NavLink>
          <NavLink
            to="/orders"
            className="nav-link"
            onClick={(e) => menuButton()}
          >
            Orders
          </NavLink>
          <NavLink
            to="/about"
            className="nav-link"
            onClick={(e) => menuButton()}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className="nav-link"
            onClick={(e) => menuButton()}
          >
            Contact
          </NavLink>
          {!loggedIn ? (
            <>
              <Link
                id="nav-login"
                className="nav-link"
                to="/login"
                onClick={(e) => menuButton()}
              >
                Login
              </Link>
              <Link
                to="/register"
                id="nav-register"
                className="nav-link"
                onClick={(e) => menuButton()}
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <NavLink
                to="/profile"
                className="nav-link"
                onClick={(e) => menuButton()}
              >
                Profile
              </NavLink>
              <Link
                to="/"
                id="nav-logout"
                className="nav-link"
                onClick={(e) => {
                  menuButton();
                  logOut();
                }}
              >
                Logout
              </Link>
              <NavLink
                to="/cart"
                id="nav-cart"
                className="nav-link nav-cart"
                onClick={(e) => menuButton()}
              >
                <LocalMallRoundedIcon className="cart-icon" />
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
