import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { redirect } from "react-router-dom";

/* This async thunk, which action is dispatched by the HomePage component, fetches the posts actually stored in the remote DB. */
export const fetchAsyncPosts = createAsyncThunk('blog/fetchAsyncPosts',
    async () => 
    {
        const response = await fetch('https://reactblogapp-52d2.restdb.io/rest/excel-blog', {
                "method" : 'GET',
                "headers" : {
                                'Cache-Control' : "no-cache",
                                'x-apikey': '63d53b073bc6b255ed0c43c2'
                            }
        });

        //response.catch((error) => {console.log("There was an error: " + error); return(redirect("/notfound"));});

        if (!response.ok)
        {
            console.log("Database call response not okay!");
            return (redirect("/notfound"));
        }
        else
            return response.json();
    }
);

/* This async thunk, which action is dispatched by the SearchResults component, queries the restDB.io through a API looking if there are any blog posts matching the keywords searched. */
export const searchAsyncPosts = createAsyncThunk('blog/searchAsyncPosts',
    async (keyword) => 
    {
        const str = "https://reactblogapp-52d2.restdb.io/rest/excel-blog?q={\"$or\":[{\"title\":{\"$in\":\"" + keyword + "\"}},{\"tags\":{\"$in\":\"" + keyword + "\"}}]}";

        const response = await fetch(str, 
        {
            "headers" : 
            {
                'Cache-Control' : "no-cache",
                'x-apikey': '63d53b073bc6b255ed0c43c2',
                'content-type': 'application/json'
            }
        });

        // response.catch((error) => {console.log("There was an error: " + error); return(redirect("/notfound"));});

        if (!response.ok)
        {
            console.log("ERROR: response not ok!");
            return(redirect("/notfound"));
        }
        else
            return response.json();
    }       
);

/* This async thunk, which action is dispatched by the BlogPost component, fetches the details of a specific post requested by the user. It queries restDB.io with a specific blog post title. */
export const retrieveAsyncPost = createAsyncThunk('blog/retrieveAsyncPost',
    async (id) =>
    {
        const URLstring = "https://reactblogapp-52d2.restdb.io/rest/excel-blog?q={\"title\":\"" + id + "\"}";
        // We need to make a query to restdb.io with the blog title to retrieve content and author.
        const response = await fetch(URLstring,
            {
                "headers" : {
                    'Cache-Control' : "no-cache",
                    'x-apikey': '63d53b073bc6b255ed0c43c2',
                    'content-type': 'application/json'
                }
            }   
        );

        // response.catch((error) => {console.log("There was an error: " + error); return(redirect("/notfound"));});

        if (!response.ok)
        {
            console.log("Database call response not ok!");
            //navigate("/notfound");
        }
        else
            return response.json();
    }
);

/* This async thunk, which action is dispatched by the LogIn component, queries restDB.io admin table to see if there is a record of a specified couple username/password. If it exists, it gets returned as a API response. */
export const loginAsyncVerification = createAsyncThunk('blog/loginAsyncVerification',
    async (event) =>
    {
        const username = event.target[0].value;
        const password = event.target[1].value;

        if (username === "" || password === "")
        {
            alert("You have to specify a username or password in order to log in!");
            return (redirect("/login"));
        }
        
        const queryString = "https://reactblogapp-52d2.restdb.io/rest/admins?q={\"username\":\"" 
                            + username + "\",\"password\":\"" + password + "\"}";

        const response = await fetch(queryString, {
                                        "method" : 'GET',
                                        "headers" : {
                                                        'Cache-Control' : "no-cache",
                                                        'x-apikey': '63d53b073bc6b255ed0c43c2'
                                                    }
                                    });
                            
        // response.catch((error) => {console.log("There was an error: " + error); return(redirect("/notfound"));});

        if (!response.ok)
        {
            console.log("Database call response not okay!");
            alert("Something went wrong. Please check your credentials and try again.");
            //redirect("/login");
        }                      
        else
            return response.json();
    }
);

const initialState =
{
    postsCollection: [],
    postsMatchingSearch: [],
    selectedPostToDisplay: {},
    loggedInAsAdmin: false,
    logInUsername: "",
    isLoading: false
}

export const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        turnOnSpinner: (state) => {
            state.isLoading = true;
        },
        turnOffSpinner: (state) => {
            state.isLoading = false;
        },
        logOutUser: (state) => {
            state.logInUsername = "";
            state.loggedInAsAdmin = false;
        }
    },
    extraReducers: {
        [fetchAsyncPosts.pending] : () => {
            console.log("Promise fetchAsyncPosts is pending.");
        },
        [fetchAsyncPosts.rejected] : () => {
            console.log("Promise fetchAsyncPosts was rejected.");
            //return(redirect("/notfound"));
        },
        [fetchAsyncPosts.fulfilled] : (state, res) => {
            console.log("Post collection was fetched successfully.");
            const retrievedList = [];
            for (const o of res.payload)
            {
                retrievedList.push(o);
            }
            return({...state, isLoading: false, postsCollection: retrievedList});
        },
        [searchAsyncPosts.pending] : () => {
            console.log("Promise searchAsyncPosts is pending.");
        },
        [searchAsyncPosts.rejected] : () => {
            console.log("Promise searchAsyncPosts was rejected.");
            //return(redirect("/notfound"));
        },
        [searchAsyncPosts.fulfilled] : (state, res) => {
            console.log("Posts searched for were fetched successfully.");
            return({...state, postsMatchingSearch : res.payload});
        },
        [retrieveAsyncPost.pending] : () => {
            console.log("Promise retrieveAsyncPost is pending.");
        },
        [retrieveAsyncPost.rejected] : () => {
            console.log("Promise retrieveAsyncPosts was rejected.");
            //return(redirect("/notfound"));
        },
        [retrieveAsyncPost.fulfilled] : (state, res) => {
            console.log("Post selected was fetched successfully.");
            return({...state, selectedPostToDisplay: res.payload[0]});
        },
        [loginAsyncVerification.pending] : () => {
            console.log("Promise loginAsyncVerification is pending.");
        },
        [loginAsyncVerification.rejected] : () => {
            console.log("Promise loginAsyncVerification was rejected.");
            //return(redirect("/notfound"));
        },
        [loginAsyncVerification.fulfilled] : (state, res) => {
            console.log("Log in credentials were fetched successfully.");
            if (res.payload.length === 1)  // The response to the query is an array of objects in the DB that matched the query.
            {
                console.log("Log In was successful!");
                return({...state, loggedInAsAdmin : true, logInUsername: res.payload[0].username})
            }        
            else
            {
                console.log("Login was unsuccessful.");
                alert("Wrong username/password. Please try again.");
                //return (redirect("/login"));
            }
        }    
    }
});

// Fuctions that components may use to subscribe and retrieve a certain piece/field of the state in the Redux store.
export const getAllPosts = (state) => state.blog.postsCollection;
export const getPostsMatchingSearch = (state) => state.blog.postsMatchingSearch;
export const getPostToDisplay = (state) => state.blog.selectedPostToDisplay;
export const getLogInStatus = (state) => state.blog.loggedInAsAdmin;
export const getSpinnerStatus = (state) => state.blog.isLoading;
export const getLogInUsername = (state) => state.blog.logInUsername;

// Finalizing actions and reducers.
export const { turnOffSpinner, turnOnSpinner, logOutUser} = blogSlice.actions;
export default blogSlice.reducer;