import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { useSelector } from "react-redux";
import { getLogInStatus } from "../redux/blogSlice";
import '../css/NewPost.css';

export const NewPost = () =>
{
    const [newPost, setNewPost] = useState(false);  // newPost = "is there a new post to POST to the DB?"
    const [formData, setFormData] = useState(null);

    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [post, setPost] = useState('');
    const [tags, setTags] = useState('');
    const [image, setImage] = useState('');

    const userIsLoggedIn = useSelector(getLogInStatus);
    
    const navigate = useNavigate();

    useEffect(() => {

        if (userIsLoggedIn === false)
        {
            alert("No user logged in at the moment! Please log in.");
            navigate("/login");
        }
        
    }, [navigate, userIsLoggedIn]);

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

                const response = await fetch('https://reactblogapp-52d2.restdb.io/rest/excel-blog', {
                    "method" : 'POST',
                    "headers" : {
                                    'Cache-Control' : "no-cache",
                                    'x-apikey': '63d53b073bc6b255ed0c43c2',
                                    'content-type' : 'application/json'
                                },
                    "body" : jsonToSend                      
                });

                const jsonData = await response.json();
                console.log(jsonData);
            }

            for (const [key, valuee] of formData)
            {
                console.log(key + " : " + valuee);
            }

            postData().catch((error) => (console.log("There was an error: " + error)));
        }

    }, [newPost, formData]);

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
            {!!userIsLoggedIn ? (
                <>
                    <h1 id="new_post_header">New blog post</h1>
                    <form id="form_container" onSubmit={(e) => { const ret = validateAndSend(e) ; if (ret instanceof FormData) { console.log("ret ="+ret); setFormData(ret); setNewPost(true); } return; }}>
                        <input className="form_item" value={title} name="title" placeholder="Title"  onChange={e => setTitle(e.target.value)} />
                        <input className="form_item" type="file" name="image" onChange={(e) => setImage(e.target.files[0])} />
                        <input className="form_summary" type="text" minLength="100" maxLength="200" value={summary} name="summary" placeholder= "Write a post summary..." onChange={e => setSummary(e.target.value)} />
                        <textarea id="form_textarea" className="form_item" value={post} name="content" type="text" placeholder="Type your post here..." onChange={e => setPost(e.target.value)} />
                        <input className="form_item" value={author} name="author" placeholder= "Author" onChange={e => setAuthor(e.target.value)} />
                        <input className="form_item" value={tags} type="text" name="tags" placeholder="Tags" onChange={e => setTags(e.target.value)} />
                        <button type="submit">Submit post</button>
                    </form>
                </>
            ) : (<p>User not logged in!</p>)}
            
        </div>
    )
}

function validateAndSend (event)
{
    event.preventDefault(); // Prevents page reload

    console.log(event.target);

    const formDataa = new FormData(event.target); // It instantiates an auxiliary formData resembling the user-filled form.
    
    // PER RIMUOVERE L'IMMAGINE, DEVO CICLARE SULLE COPPIE CHIAVE.VALORE E NON SOLO SUI VALUES,
    // PERCHE' IL METODO .delete(name) CHIEDE IL NOME DELLA CHIAVE. 
    for (let value in formDataa.values()) 
    {  
        if (value === '' || value === undefined)  // Check if the formData compiled by the user has some missing inputs.
        {
            alert("You must fill every field of the form!");
            return new Error("Form fields not filled correctly!");
        }
    }

    return formDataa;
};