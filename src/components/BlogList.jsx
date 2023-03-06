import React from "react";
import { BlogItemPreview } from "./BlogItemPreview";

export const BlogList = (props) =>
{
    if (props.blogList === undefined || props.blogList.length === 0)
        return null;

    else
    {
        const blogItems = props.blogList.map((o) => {
            return (<BlogItemPreview title={o.title} author={o.author} key={o.title} />);
        } );

        return (
            <div id="blog_item_container">
                { blogItems }
            </div>
        );
    }
   
}