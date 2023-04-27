import "./Navbar.css";
import React from "react";
import Logo from "../../images/Picsart_23-04-05_12-35-00-032.jpg";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";
import cookie from "react-cookies";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }

  componentDidMount() {
    this.isLoggedIn();
  }
  isLoggedIn = () => {
    axios
      .get(`${process.env.REACT_APP_URL}/user/is-logged-in`, {
        headers: { auth_token: cookie.load("auth_token") },
      })
      .then((response) => {
        if (response.status === 200) {
          this.setState({ isLoggedIn: true });
        }
      })
      .catch((error) => {
        if (error.response === undefined) {
          this.setState({ isLoggedIn: false });
        } else {
          this.setState({ isLoggedIn: false });
        }
      });
  };

  logOut = () => {
    cookie.remove("auth_token", { path: "/" });
    cookie.remove("user", { path: "/" });
    this.isLoggedIn();
  };

  menuButton() {
    document
      .getElementsByClassName("nav-container")[0]
      .classList.toggle("nav-change");
    document
      .getElementsByClassName("nav-navigation")[0]
      .classList.toggle("nav-show");
    document
      .getElementsByClassName("nav-whole-nav")[0]
      .classList.toggle("nav-vertical");
  }

  render() {
    let loggedIn = this.state.isLoggedIn;
    return (
      <nav className="nav-whole-nav">
        <div className="nav-logo">
          <Link className="nav-logo-title nav-link" to="/">
            <img src={Logo} width="50" height="50" alt="Square Art logo" />
            <span className="nav-title">Khizana</span>
          </Link>
        </div>
        <div className="nav-menu">
          <div className="nav-container" onClick={(e) => this.menuButton()}>
            <div className="nav-bar1"></div>
            <div className="nav-bar2"></div>
            <div className="nav-bar3"></div>
          </div>
          <div className="nav-navigation">
            <NavLink
              to="/"
              className="nav-link"
              onClick={(e) => this.menuButton()}
            >
              Home
            </NavLink>
            <NavLink
              to="/categories"
              className="nav-link"
              onClick={(e) => this.menuButton()}
            >
              Categories
            </NavLink>
            <NavLink
              to="/instructions"
              className="nav-link"
              onClick={(e) => this.menuButton()}
            >
              Instructions
            </NavLink>
            <NavLink
              to="/orders"
              className="nav-link"
              onClick={(e) => this.menuButton()}
            >
              Orders
            </NavLink>
            <NavLink
              to="/about"
              className="nav-link"
              onClick={(e) => this.menuButton()}
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className="nav-link"
              onClick={(e) => this.menuButton()}
            >
              Contact
            </NavLink>

            {!loggedIn ? (
              <>
                <Link
                  id="nav-login"
                  className="nav-link"
                  to="/login"
                  onClick={(e) => this.menuButton()}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  id="nav-register"
                  className="nav-link"
                  onClick={(e) => this.menuButton()}
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <NavLink
                  to="/profile"
                  className="nav-link"
                  onClick={(e) => this.menuButton()}
                >
                  Profile
                </NavLink>
                <Link
                  to="/"
                  id="nav-logout"
                  className="nav-link"
                  onClick={(e) => {
                    this.menuButton();
                    this.logOut();
                  }}
                >
                  Logout
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
