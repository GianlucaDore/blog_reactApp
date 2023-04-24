import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { BlogList } from "../components/BlogList";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { ClipLoader } from 'react-spinners';
import { getPostsMatchingSearch, getSpinnerStatus, searchAsyncPosts, turnOnSpinner, purgeSearchResults } from "../redux/blogSlice";
import { useDispatch, useSelector } from "react-redux";

export const SearchResults = () =>
{

    const [searchParams, setSearchParams] = useSearchParams();  // Returns the current URL's search params and a function to update the query string in the URL.

    const searchResults = useSelector(getPostsMatchingSearch); // Redux store subscription to retrieve the posts searched for in the query string.
    const isLoading = useSelector(getSpinnerStatus); // Redux store subscription to know if the component is loading/fetching data, to know when to display a spinner.

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(turnOnSpinner());  // Turn on the spinner.

        const q = searchParams.get('q');  // Words to search are written in the URL search query.

        dispatch(searchAsyncPosts(q)); // Dispatch the async action that asks restdb.io if there are any matching results.

        return () => {
            dispatch(purgeSearchResults());
        };

    }, []);  // useEffect triggers only when the SearchResults component is mounted.


    return (    // The component renders the number of entries found and the array of little boxes which are the search results blog previews. 
        <div>
            <NavBar />
            <h2>Search results</h2>
            {!!searchResults.length ? (<><h4>Entries found:</h4><BlogList blogList={searchResults} /></>) : (!!isLoading ? (<><h4>Searching...</h4><ClipLoader color={"navy"} loading={isLoading} size={150} /></>) : (<h4>No entries found for your search!</h4>))} 
            <Footer position="stay_fixed"/>
        </div>
    );
}