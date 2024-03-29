import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from './pages/HomePage';
import { BlogPost } from './pages/BlogPost';
import { NotFound } from './pages/NotFound';
import { NewPost } from './pages/NewPost';
import { SearchResults } from './pages/SearchResults';
import { Login } from './pages/Login';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Profile } from './pages/Profile';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
            <Route exact path="/" element={ <HomePage /> } />
            <Route path="/blogs">
                <Route index element={ <BlogPost /> } />
                <Route path=":id" element={ <BlogPost /> } />
            </Route>
            <Route path="/search" element={ <SearchResults /> } />
            <Route path="/newpost" element={ <NewPost /> } />
            <Route path="/login" element={ <Login /> } />
            <Route path="/error" element={ <NotFound /> } />
            <Route path="*" element={ <NotFound /> } />
            <Route path="/profile" element={ <Profile /> } />
        </Routes>
      </BrowserRouter>
    </Provider> 
    
  </React.StrictMode>
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
