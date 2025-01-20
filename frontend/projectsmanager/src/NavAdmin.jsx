import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "./AppContext";

function NavAdmin() {
        const { isLogged } = useContext(AppContext);
        if(isLogged) return <div className="container" style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "white",
        color: "black",
        }}>
        <h1 style={{fontSize: "50px", marginBottom: "50px"}}>Admin Sector</h1>
        <NavLink
                className="navbar-item is-active"
                to="/admin/users"
                style={{marginBottom: "50px", backgroundColor: "blue", color:"white", borderRadius: "40px", fontSize: "30px"}}
                >
                Get All Users
        </NavLink>
        <NavLink
                className="navbar-item is-active"
                to="/admin/register-admin"
                style={{marginBottom: "50px", backgroundColor: "black", color:"white", borderRadius: "40px", fontSize: "30px"}}
                >
                Register New Admin
        </NavLink>
        <NavLink
                className="navbar-item is-active"
                to="/admin/delete"
                style={{marginBottom: "50px", backgroundColor: "red", color:"white", borderRadius: "40px", fontSize: "30px"}}
                >
                Delete User
        </NavLink>
        </div>
        else return <div className="container" style={{
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                backgroundColor: "white",
                color: "black",
              }}>
                <h1 style={{fontSize: "30px", textAlign: "center"}}>Login to acess this page !</h1>
              </div>
}

export default NavAdmin;