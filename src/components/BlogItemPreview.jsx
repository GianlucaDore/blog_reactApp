import React from "react";

export const BlogItemPreview = (props) =>
{
    return (
        <div className="blog_item_preview">
            <button onClick={() => {navigate("/posts/") + ''}}>
               <h5>{props.title}</h5>
               <p>{props.author}</p>
            </button>
        </div>
    );
}