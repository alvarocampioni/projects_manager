import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import "bulma/css/bulma.min.css";
import { AppContext } from "./AppContext";

const Navbar = () => {
    const [isOpen, setOpen] = useState(false);
    const { isAdmin, isLogged } = useContext(AppContext);
    return (
      <nav
        className="navbar is-primary"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container" 
            style={{backgroundColor: "#7ee8ff"}}
        >
          <div className="navbar-brand">
            <a
              role="button"
              className={`navbar-burger burger ${isOpen && "is-active"}`}
              aria-label="menu"
              aria-expanded="false"
              style={{backgroundColor: "#7ee8ff"}}
              onClick={() => setOpen(!isOpen)}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
  
          <div className={`navbar-menu ${isOpen && "is-active"}`}>
            <div className="navbar-start"
                style={{padding: "30px"}}
            >
              {isAdmin ? <NavLink
                className="navbar-item is-active"
                to="/admin"
              >
                Admin
              </NavLink> : ""}
              <NavLink
                className="navbar-item is-active"
                to="/"
              >
                Timer
              </NavLink>
              <NavLink
                className="navbar-item is-active"
                to="/login"
              >
                Login
              </NavLink>
  
              <NavLink
                className="navbar-item is-active"
                to="/register"
              >
                Register
              </NavLink>

              <NavLink
                className="navbar-item is-active"
                to="/add"
                >
                Add Project
              </NavLink>

              <NavLink
                className="navbar-item is-active"
                to="/intervals"
                >
                Set Time Intervals
              </NavLink>
              {isLogged ? <NavLink
                className="navbar-item is-active"
                to="/user"
              >
                Account Settings
              </NavLink> : ""}
            </div>
  
            <div className="navbar-end">
              <div className="navbar-item">
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  };
  
  export default Navbar;