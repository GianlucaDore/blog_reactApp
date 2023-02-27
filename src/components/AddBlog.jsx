import React from "react";
import { useNavigate } from "react-router-dom";

export const AddBlog = () => 
{
    const navigate = useNavigate();

    return (
        <div id="add_blog_button">
            <button onClick={() => {navigate("/newpost")}} >
                <img src="plus.png" alt="Add blog icon" />   
            </button>
        </div>
    );
}