import React, { useEffect } from "react";
import { NavBar } from "../components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { getLogInStatus, logOutUser } from "../redux/blogSlice";
import { useNavigate } from "react-router-dom";

export const Profile = () =>
{
    const isLoggedIn = useSelector(getLogInStatus);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn === false)
        {
            alert("No user logged in at the moment! Please log in.");
            navigate("/login");
        }

    }, [])

    return ( 
        <div>
            <NavBar />
            {(isLoggedIn) ? (<div>
                <h3>Log Out</h3>
                <p>Are you sure you want to log out?</p>
                <button onClick={() => {dispatch(logOutUser()); alert("Log Out was successful.");}}>OK</button>
            </div>) : (<p>No users logged in at the moment.</p>)}
        </div>
    )
}