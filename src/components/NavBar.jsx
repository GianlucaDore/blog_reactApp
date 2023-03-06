import React from "react";
import { NavLink } from "react-router-dom";
import '../css/NavBar.css';

export const NavBar = () =>
{
    return (
        <div id="navbar">
            <nav className="nav_elements">
                    <NavLink to="/">React Blog App!</NavLink>
            </nav>
        </div>
    )

}