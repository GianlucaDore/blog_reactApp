import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import '../css/Login.css';
import { loginAsyncVerification, getLogInStatus } from "../redux/blogSlice";
import { useDispatch, useSelector } from "react-redux";

export const Login = () =>
{
    const [user, setUser] = useState(""); // CONTROLLED form by the state.
    const [password, setPassword] = useState("");  // CONTROLLED form by the state.

    const userIsLoggedIn = useSelector(getLogInStatus);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        
        if (userIsLoggedIn === true)
            navigate("/");
    }, [userIsLoggedIn, navigate]); // Automatic redirect to homepage when user logs in.

    return (
        <div id="login">
            <NavBar />
            <div id="login_container">
                <h6>Log In</h6>
                <form id="login_form" onSubmit={async (e) => {e.preventDefault(); dispatch(loginAsyncVerification(e));}}>
                    <input type="text" id="username_input" name="username" value={user} placeholder="Username" onChange={(e) => setUser(e.target.value)} />
                    <input type="password" id="password_input" name="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">OK</button>
                </form>
            </div>
        </div>
    );
};