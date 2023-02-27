import React from "react";
import { generatePath, useNavigate } from 'react-router-dom';
 
export const BlogItemPreview = (props) =>
{
    const navigate = useNavigate();

    return (
        <div className="blog_item_preview">
            <button onClick={() => { navigate( generatePath("/blogs/:id", { id : props.title }) ) }}>
               <h5>{props.title}</h5>
               <p>{props.author}</p>
            </button>
        </div>
    );
}