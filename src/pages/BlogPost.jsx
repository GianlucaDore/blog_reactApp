import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { ClipLoader } from 'react-spinners';

export const BlogPost = () =>
{
    const [blogData, setBlogData] = useState({title : null, content : null, tags : null});  // Initialization of state, in order to display "null" until useEffect fetches the data.
    // const [deletePost, setDeletePost] = useState(false);  nope! anti-pattern. We'll handle the post's deletion in the button handler.
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    const urlParams = useParams();

    useEffect(() => {

        const retrieveBlog = async () =>
        {
            // We need to make a query to restdb.io with the blog title to retrieve content and author.

            const response = await fetch("https://reactblogapp-52d2.restdb.io/rest/excel-blog?q={\"title\":\"" + urlParams.id + "\"}",
                {
                    "headers" : {
                        'Cache-Control' : "no-cache",
                        'x-apikey': '63d53b073bc6b255ed0c43c2',
                        'content-type': 'application/json'
                    }
                }
            );

            if (!response.ok)
            {
                console.log("Database call response not ok!");
                navigate("/notfound");
            }

            else
            {
                const res = await response.json();

                setBlogData(res[0]);

                setIsLoading(false);
            }
        }

        retrieveBlog().catch((error) => (console.log("There was an error: " + error)));

    }, []);


    /* The API used to DELETE the post should be called in the event handler of the onClick event of the button .
       The idea to put it in another useEffect hook triggered by a state change by the handler is bad / anti-pattern ,
       since the API call is not supposed to be called when the state changes, but on user-action (event).    
       So, we'll handle the deletion directly in the even handler. */
    return(
        <div>
            <NavBar />
            {!!isLoading ? (<ClipLoader color={"navy"} loading={isLoading} size={150} /> ) : null}
            {!!blogData.title ? <h1>{blogData.title}</h1> : null}
            {!!blogData.content ? <p>{blogData.content}</p> : null}
            {!!blogData.tags ? <h5>{blogData.tags}</h5> : null}
            {!!isLoading ? null : (<button onClick={() => {const ret = handleDeletion(blogData); if (ret === 404) {navigate("/notfound")} else {navigate("/")}} }>Delete this post</button>)}
            <Footer position="stay_sticky"/>
        </div>
        
    );
}

async function handleDeletion(blogData)  // This is the function called by the event handler to handle the DELETE API call on user interaction (onClick).
{
    const str = "https://reactblogapp-52d2.restdb.io/rest/excel-blog/" + blogData._id;
    console.log(str);

    console.log(blogData);

    const response = await fetch(str,
    {
        "method" : 'DELETE',
        "headers" : 
        {
            'Cache-Control' : "no-cache",
            'x-apikey': '63d53b073bc6b255ed0c43c2',
            'content-type': 'application/json'
        }
    });

    if (!response.ok)
    {
        console.log("Database call response not ok! Can't delete the post now.");
        return 404;
    }

    else
    {
        const res = await response.json();
        if (res["result"] === 0)
        {
            alert("Can't delete this post now! Sorry for the inconvenient.");
            return 404;
        }
        else
            return 200;
    }
}