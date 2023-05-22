import React from "react";
import { NavBar } from "../components/NavBar";

export const NotFound = () =>
{
    return (
        <div id="not_found">
            <NavBar />
            <h1>404 Page not found!</h1>
            <p id="p_not_found">The page you requested was not found on this server.</p>
        </div>
    )
};