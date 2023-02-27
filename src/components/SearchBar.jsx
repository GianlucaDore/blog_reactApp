import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SearchBar = () =>
{
    const navigate = useNavigate();

    const [searchparams, setSearchparams] = useState(null);

    return (
        <div id="search_form">
            <form onSubmit={(event) => { event.preventDefault(); navigate("/search?q=" + event.target[0].value) }}> 
                <input name="search_params" value={searchparams} placeholder="Search..." onChange={e => setSearchparams(e.target.value)} />
                <button type="submit">Search</button>
            </form>
        </div>
    );
}