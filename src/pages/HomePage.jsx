import React from 'react';
import { useEffect } from 'react';
import { AddBlog } from "../components/AddBlog";
import { BlogList } from "../components/BlogList";
import { SearchBar } from "../components/SearchBar";
import { Header } from "../components/Header";
import { NavBar } from '../components/NavBar';
import '../css/HomePage.css';
import { ClipLoader } from 'react-spinners';
import { fetchAsyncPosts, getAllPosts, getLogInStatus, getSpinnerStatus, turnOnSpinner, removeBlogListPosts } from '../redux/blogSlice';
import { useDispatch, useSelector } from 'react-redux';

export const HomePage = () =>
{

    const postsCollectionData = useSelector(getAllPosts); // Redux store subscription for the post collection.
    const userIsLoggedIn = useSelector(getLogInStatus); // Redux store subscription to know if an admin is authenticated or not.
    const isLoading = useSelector(getSpinnerStatus); // Redux store subscription to know if the component is loading/fetching data, to know when to display a spinner.

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(turnOnSpinner()); // Component gets rendered: turn on the spinner, we're about to fetch the data still, and component's not ready to display the collection.

        dispatch(fetchAsyncPosts()); // Dispatch the async thunk to retrieve the blog posts collection.

        return () =>
        {
            dispatch(removeBlogListPosts());
        }

    }, []); 
    

    return (   // Only if an admin is logged in, then we display the button to write a new blog post. 
        <div id="home_page">
            <NavBar />
            <Header />
            <SearchBar />
            {!!userIsLoggedIn ? (<AddBlog />) : null}
            <div id="home_page_blog_list">
                <h2 className='recent_submitted_posts'>Recent submitted posts:</h2>
                <ClipLoader color={"navy"} loading={isLoading} size={150} />
                <BlogList blogList={postsCollectionData} />
            </div>
        </div>
    );
};