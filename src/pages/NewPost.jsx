import React from "react";
import { Footer } from "../components/Footer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../css/NewPost.css';
import { NavBar } from "../components/NavBar";

export const NewPost = () =>
{
    const [newPost, setNewPost] = useState(false);  // newPost = "is there a new post to POST to the DB?"
    const [formData, setFormData] = useState(null);

    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [post, setPost] = useState('');
    const [tags, setTags] = useState('');
    
    const navigate = useNavigate();

    useEffect(() => {  // useEffect triggers when newPost state variable changes, and executes when it goes from false to true.

        if (newPost === true)  // If it notices a new post, triggered by the form's button, sends the new post to the database.
        {
            const postData = async () =>
            {
                let obj = {}
                formData.forEach((value, key) => {obj[key] = value;});
                var jsonToSend = JSON.stringify(obj);

                console.log("obj = " + obj);
                console.log("jsonToSend = " + jsonToSend);

                fetch('https://reactblogapp-52d2.restdb.io/rest/excel-blog', {
                    "method" : 'POST',
                    "headers" : {
                                    'Cache-Control' : "no-cache",
                                    'x-apikey': '63d53b073bc6b255ed0c43c2',
                                    'content-type': 'application/json'
                                },
                    "body" : jsonToSend,
                    "json" : true           
                });
            }

            postData().catch((error) => (console.log("There was an error: " + error)));
        }

    }, [newPost]);

    let confirmation = null;
    if (newPost === true)
    {
        confirmation =  <div id="confirmation_message">
                            <img src="spuntaverde.png" alt="operation completed"/>
                            <h6>New post sent to the blog.</h6>
                            <p>You can now click on the button below to go back to the homepage.</p>
                            <button onClick={() => {navigate("/")}}>OK</button>
                        </div>
    }

    return (
        // If the state variable newPost is null, we shall render a CONTROLLED form to enter a new blog post. 
        // Then we shall update the state.  
        // Then, we shall render a confirmation message telling the user the form was sent to the DB with a "close" button to let him go back to the posts array homepage.

        <div id="new_post">
            <NavBar />
            {confirmation}
            <h1 id="new_post_header">New blog post</h1>
            <form id="form_container" onSubmit={(e) => { const ret = validateAndSend(e) ; if (ret instanceof FormData) { console.log("ret ="+ret); setFormData(ret); setNewPost(true); } return; }}>
                <input className="form_item" value={author} name="author" placeholder= "Author" onChange={e => setAuthor(e.target.value)} />
                <input className="form_item" value={title} name="title" placeholder="Title"  onChange={e => setTitle(e.target.value)} />
                <textarea id="form_textarea" className="form_item" value={post} name="content" type="text" placeholder="Type your post here..." onChange={e => setPost(e.target.value)} />
                <input className="form_item" value={tags} name="tags" placeholder="Tags" onChange={e => setTags(e.target.value)} />
                <button type="submit">Submit post</button>
            </form>
            <Footer />
        </div>
        
    )
}

function validateAndSend (event)
{
    event.preventDefault(); // Prevents page reload

    // setIsLoading(true);   spinner

    console.log(event.target);

    const formDataa = new FormData(event.target); // It instantiates an auxiliary formData resembling the user-filled form.
    for (let value in formDataa.values()) 
    {  
        if (value === '')  // Check if the formData compiled by the user has some missing inputs.
        {
            alert("You must fill every field of the form!");
            return new Error("Form fields not filled correctly!");
        }
    }

    console.log("formDataa : ");
    for (let o of formDataa.entries())
    {
        console.log(o[0] + '=' + o[1]);
    }

    return formDataa;
}