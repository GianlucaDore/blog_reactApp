import React from "react";
import '../css/Footer.css';

export const Footer = (props) =>
{
    return (
        <div id="footer">
            <footer className={props.position}>
                <p>This site was created by G.Dore. All rights reserved to the owner.</p>
            </footer>
        </div>
    )
}