import React from 'react';
import { useState, useEffect } from 'react';
import { AddBlog } from "../components/AddBlog";
import { BlogList } from "../components/BlogList";
import { SearchBar } from "../components/SearchBar";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const HomePage = () =>
{
    const [blogList, setBlogList] = useState([]);

    useEffect(async () => {
        // API call to restdb.io to retrieve the stored blog list.

        const response = await fetch('https://reactblogapp-52d2.restdb.io/rest/excel-blog', {
            "method" : 'GET',
            "headers" : {
                            'Cache-Control' : "no-cache",
                            'x-apikey': 'a9dfb57175ae596aeb32c3990ca5f68a972c5'
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

            let retrievedList = [];
            let obj={
                "title" : null,
                "content" : null,
                "tags" : []
            };

            for (let o in res)
            {
                obj.title = o.title;
                obj.content = o.content;
                obj.tags = o.tags.split(" ");

                retrievedList.push(obj);
            }

            setBlogList(retrievedList);
        }

    }, []);
    

    return (
        <div id="home_page">
            <Header />
            <SearchBar />
            <AddBlog />
            <BlogList list={blogList} />
            <Footer />
        </div>
    );

}