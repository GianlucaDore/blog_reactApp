import React from "react";
import { BlogItemPreview } from "./BlogItemPreview";

export const BlogList = (props) =>
{
    if (props.blogList === undefined || props.blogList.length === 0)
        return null;

    else
    {
        const blogItems = props.blogList.map((o) => {
            return (<BlogItemPreview title={o.title} summary={o.summary} author={o.author} tags={o.tags} key={o.title} />);
        } );

        return (
            <div id="blog_item_container">
                { blogItems }
            </div>
        );
    }
}