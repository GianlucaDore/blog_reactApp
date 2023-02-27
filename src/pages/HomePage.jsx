import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddBlog } from "../components/AddBlog";
import { BlogList } from "../components/BlogList";
import { SearchBar } from "../components/SearchBar";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const HomePage = () =>
{
    const [blogList, setBlogList] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        // API call to restdb.io to retrieve the stored blog list.

        const fetchData = async () => 
        {
            const response = await fetch('https://reactblogapp-52d2.restdb.io/rest/excel-blog', {
                "method" : 'GET',
                "headers" : {
                                'Cache-Control' : "no-cache",
                                'x-apikey': '63d53b073bc6b255ed0c43c2'
                            }
            });

            if (!response.ok)
            {
                console.log("Database call response not okay!");
                navigate("/notfound");
            }

            else
            {
                const res = await response.json();

                const retrievedList = [];
                /*  let obj={
                    "title" : null,
                    "content" : null,
                    "tags" : []
                }; */

                for (const o of res)
                {
                    /*
                    obj.title = o.title;
                    obj.content = o.content;
                    obj.tags = o.tags.split(" ");
                    */
                    retrievedList.push(o);
                }

                setBlogList(retrievedList);
            }
        }

        fetchData().catch((error) => (console.log("There was an error: " + error)));
    }, []);
    

    return (
        <div id="home_page">
            <Header />
            <SearchBar />
            <AddBlog />
            <BlogList blogList={blogList} />
            <Footer />
        </div>
    );

}