import React, { useState } from "react";
import "./Searchbox.css";
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const [userData, setUserData] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const value = e.target.value;
    setUserData(value);

    if (value) {
      const apiKey = import.meta.env.VITE_TMDB_API_RAT;
      const url = `https://api.themoviedb.org/3/search/movie?query=${value}&include_adult=false&language=en-US&page=1`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`
    }
  };
  
  fetch(url, options)
    .then(res => res.json())
    .then(json => {
      var filtered = json.results.filter((item)=>item.title.toLowerCase().startsWith(value.toLowerCase()))
      setFilteredSuggestions(filtered)}
    )
    .catch(err => console.error('error:' + err));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      setFilteredSuggestions([]); 
    }
  };


  const handleSuggestionClick = (suggestion) => {
    setUserData(suggestion.title);
    setShowSuggestions(false);
  };
  return (
    <div className={`search-box ${showSuggestions ? "active" : ""}`}>
      <img src="https://img.icons8.com/?size=30&id=vdK7simX78vX&format=png&color=7b61ff" className=" search-icon" alt="" />
      <input
        type="text"
        value={userData}
        onChange={handleInputChange}
        placeholder="Find movies, TV shows and more..."
      />

      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="autocom-box">
          <ul>
            {filteredSuggestions.map((suggestion, index) => (
              <li key={index} onClick={()=>{
                navigate(`/movie/${suggestion.id}`)
              }}>
                <img src={`https://image.tmdb.org/t/p/w500${suggestion.poster_path}`} alt="" />
                <div>

                <h4>{suggestion.title}</h4>
                <p className="release-date">{suggestion.release_date}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {showSuggestions && filteredSuggestions.length === 0 && (
        <div className="autocom-box">
          <ul>
            <li>{userData}</li>
          </ul>
        </div>
      )}
    </div>
  );
};
