import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { ClipLoader } from 'react-spinners';
import "../css/BlogPost.css";
import { useDispatch, useSelector } from "react-redux";
import { getLogInStatus, getPostToDisplay, retrieveAsyncPost, getSpinnerStatus, removeBlogPostDetails, turnOnSpinner } from "../redux/blogSlice";

export const BlogPost = () =>
{
    // const [deletePost, setDeletePost] = useState(false);  nope! anti-pattern. We'll handle the post's deletion in the button handler.

    const blogData = useSelector(getPostToDisplay); // Redux store subscription to the blog post data to display.
    const userIsLoggedIn = useSelector(getLogInStatus);  // Redux store subscription to know whether an admin is logged in or not.
    const isLoading = useSelector(getSpinnerStatus); // Redux store subscription to know if a compoennt is loading data (and thus we require to display a spinner).

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const urlParams = useParams();  // To retrieve the post, we must look at URL parameters, since the parent component didn't render this but it redirected the user to a Route associated to this component.

    useEffect(() => {

        dispatch(turnOnSpinner());

        dispatch(retrieveAsyncPost(urlParams.id));  // Dispatch the async action to retrieve the requested post's details.

        return () => {
            dispatch(removeBlogPostDetails());
        };

    }, []);


    /* The API used to DELETE the post should be called in the event handler of the onClick event of the button .
       The idea to put it in another useEffect hook triggered by a state change by the handler is bad / anti-pattern ,
       since the API call is not supposed to be called when the state changes, but on user-action (event).    
       So, we'll handle the deletion directly in the even handler. */
    return(
        <div id="blogpost">
            <NavBar />
            {!!isLoading ? (<ClipLoader color={"navy"} loading={isLoading} size={150} /> ) : null}
            {!!blogData.title ? <h1 id="blog_post_title">{blogData.title}</h1> : null}
            {!!blogData.content ? <p id="blog_post_content">{blogData.content}</p> : null}
            {!!blogData.tags ? <h5 id="blog_post_tags">{blogData.tags}</h5> : null}
            {(!isLoading && userIsLoggedIn) ? (<button id="delete_blog_post" onClick={() => {const ret = handleDeletion(blogData); if (ret === 404) {navigate("/notfound")} else {navigate("/")}} }>Delete this post</button>) : null }
            <Footer position="stay_sticky"/>
        </div> 
    );  // We render the delete post button only if an admin is currently logged in.
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