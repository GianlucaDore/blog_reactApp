import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { BlogList } from "../components/BlogList";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { ClipLoader } from 'react-spinners';

export const SearchResults = () =>
{

    const [searchResults, setSearchResults] = useState([]); // Initialization of state, in order to display "entries: 0" in case the search fails.
    const [isLoading, setIsLoading] = useState(true);

    const [searchParams, setSearchParams] = useSearchParams();  // Returns the current URL's search params and a function to update the query string in the URL.

    useEffect(() => {

        async function searchQuery()
        {
            const q = searchParams.get('q');

            const str = "https://reactblogapp-52d2.restdb.io/rest/excel-blog?q={\"$or\":[{\"title\":{\"$in\":\"" + q + "\"}},{\"tags\":{\"$in\":\"" + q + "\"}}]}";

            console.log(str);
            // const str = "https://reactblogapp-52d2.restdb.io/rest/excel-blog?q={\"$or\":[{\"title\":{\"$in\":\"LOREM IPSUM\"}},{\"title\":{\"$in\":\"far\"}}]}";
            const response = await fetch(str, 
            {
                "headers" : 
                {
                    'Cache-Control' : "no-cache",
                    'x-apikey': '63d53b073bc6b255ed0c43c2',
                    'content-type': 'application/json'
                }
            });

            if (!response.ok)
            {
                console.log("ERROR: response not ok!");
                return;
            }

            const res = await response.json();

            setSearchResults(res);

            setIsLoading(false);

            console.log("Done updating state");
        }

        searchQuery().catch((error) => console.log("There was an error: " + error));

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