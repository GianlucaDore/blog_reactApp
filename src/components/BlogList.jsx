import React from "react";

export const BlogList = (props) =>
{
    const blogItems = props.blogList.map((o) => {
        <BlogItemPreview title={o.title} author={o.author} />
    } )

    
    return (blogItems);
}