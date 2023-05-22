import React from "react";
import { generatePath, useNavigate } from 'react-router-dom';
 
export const BlogItemPreview = (props) =>
{
    const navigate = useNavigate();

    return (
        <div className="blog_item_preview">
            <img src="props.image" alt="Blog post preview" />
            <div className="blog_item_tags_author">
                <h6>{props.tags}</h6>
                <h6>{props.author}</h6>
            </div>
            <h1>{props.title}</h1>
            <p>{props.summary}</p>
            <button className="read_full_blog_post_button" onClick={() => { navigate( generatePath("/blogs/:id", { id : props.title }) ) }}>Read full article</button>
        </div>
    );
}