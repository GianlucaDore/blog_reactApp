import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { BlogList } from "../components/BlogList";
import { Footer } from "../components/Footer";

export const SearchResults = () =>
{

    const [searchResults, setSearchResults] = useState([]); // Initialization of state, in order to display "entries: 0" in case the search fails.

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

            console.log("Done updating state");
        }

        searchQuery().catch((error) => console.log("There was an error: " + error));

        console.log("useEffect ended");
        

    }, []);  // useEffect triggers only when the SearchResults component is mounted.


    return (    // The component renders the number of entries found and the array of little boxes which are the search results blog previews. 
        <div>
            <h2>Search results</h2>
            <h4>Entries found: {searchResults.length}</h4>
            <BlogList blogList={searchResults} />
            <Footer />
        </div>
        
    );

}