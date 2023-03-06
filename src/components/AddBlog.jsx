import React from "react";
import { useNavigate } from "react-router-dom";
import plus from '../images/plus.png';

export const AddBlog = () => 
{
    const navigate = useNavigate();

    return (
        <div id="add_blog">
            <button id="plus_button" onClick={() => {navigate("/newpost")}} >
                <img id="plus_icon" src={plus} alt="Add blog icon" /> 
                <p>Click to add a new blog post...</p>  
            </button>
        </div>
    );
}