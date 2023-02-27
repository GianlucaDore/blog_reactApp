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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
          <Route exact path="/" element={ <HomePage /> } />
          <Route path="/blogs">
              <Route index element={ <BlogPost /> } />
              <Route path=":id" element={ <BlogPost /> } />
          </Route>
          <Route path="/search" element={ <SearchResults /> } />
          <Route path="/newpost" element={ <NewPost /> } />
          <Route path="/error" element={ <NotFound /> } />
          <Route path="*" element={ <NotFound /> } />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
