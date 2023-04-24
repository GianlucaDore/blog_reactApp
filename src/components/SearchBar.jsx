import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import lens from '../images/lens.png';

export const SearchBar = () =>
{
    const navigate = useNavigate();

    const [searchparams, setSearchparams] = useState("");

    return (
        <div>
            <form className="search_form" onSubmit={(event) => { event.preventDefault(); navigate("/search?q=" + event.target[0].value) }}> 
                <input className="search_input" name="search_params" value={searchparams} placeholder="Search posts..." onChange={e => setSearchparams(e.target.value)} />
                <button id="lens_button" type="submit">
                    <img id="lens_icon" src={lens} alt="search_icon" />
                </button>
            </form>
        </div>
    );
}