import React, { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import '../css/Login.css';

export const Login = () =>
{
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    

    return (
        <div id="login">
            <NavBar />
            <div id="login_container">
                <h6>Log In</h6>
                <form id="login_form" onSubmit={async (e) => {e.preventDefault(); await queryRestDBForLogin(e)}}>
                    <input type="text" id="username_input" name="username" value={user} placeholder="Username" onChange={(e) => setUser(e.target.value)} />
                    <input type="password" id="password_input" name="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">OK</button>
                </form>
            </div>
            <Footer position="stay_fixed" />
        </div>
        
    );
}

async function queryRestDBForLogin(event)
{

    const username = event.target[0].value;
    const password = event.target[1].value;

    if (username === "" || password === "")
    {
        alert("You have to specify a username or password in order to log in!");
        return (redirect("/login"));
    }
    
    const queryString = "https://reactblogapp-52d2.restdb.io/rest/admins?q={\"username\":\"" 
                        + username + "\",\"password\":\"" + password + "\"}";

    const response = await fetch(queryString, {
                                    "method" : 'GET',
                                    "headers" : {
                                                    'Cache-Control' : "no-cache",
                                                    'x-apikey': '63d53b073bc6b255ed0c43c2'
                                                }
                                });
                        
    if (!response.ok)
    {
        console.log("Database call response not okay!");
        alert("Something went wrong. Please check your credentials and try again.");
        redirect("/login");
    }
                        
    else
    {
        const res = await response.json();
                        
        if (res.length === 1)  // The response to the query is an array of objects in the DB that matched the query.
        {
            // Login was successful.
            // We will tell Redux store that user was authenticated as an admin.
            console.log("Log In was successful!");
        }        

        else
        {
            console.log("Login was unsuccessful.");
            alert("Wrong username/password. Please try again.");
            return (redirect("/login"));
        }
    }
}