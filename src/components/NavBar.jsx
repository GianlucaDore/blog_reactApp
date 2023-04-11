import React from "react";
import { NavLink } from "react-router-dom";
import '../css/NavBar.css';
import { useSelector } from "react-redux";
import { getLogInStatus, getLogInUsername } from "../redux/blogSlice";
import userIcon from "../images/user.png";

export const NavBar = () =>
{
    const isLoggedIn = useSelector(getLogInStatus);
    const username = useSelector(getLogInUsername);

    return (
        <div id="navbar">
            <nav className="nav_elements">
                    <NavLink id="navlink_title" to="/"><p className="nav_logo">React Blog App!</p></NavLink>
                    {(isLoggedIn) ? (<div id="user_div"><NavLink className="user_container" to="/profile">{username}</NavLink><NavLink className="user_container" to="/profile"><img id="user_icon" src={userIcon} alt="user_icon" /></NavLink></div>) : (<div id="login_div"><NavLink to="/login"><p className="nav_logo"></p>Log In</NavLink></div>)}
            </nav>
        </div>
    );
}