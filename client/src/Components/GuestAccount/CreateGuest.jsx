import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./CreateGuest.css";

export const CreateGuest = () => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const [username, setUsername] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(
      `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${apiKey}`
    )
      .then((response) => response.json())
      .then((json) => {
        localStorage.setItem("sessionId", json.guest_session_id);
        localStorage.setItem("sessionExpiration", json.expires_at); 
        localStorage.setItem("username", username);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error creating guest session:", error);
      });
  };

  useEffect(() => {
    const sessionExpiration = localStorage.getItem("sessionExpiration");
    if (sessionExpiration) {
      const expirationDate = new Date(sessionExpiration).getTime();
      if (new Date().getTime() > expirationDate) {
        localStorage.removeItem("sessionId");
        localStorage.removeItem("username");
        localStorage.removeItem("sessionExpiration");
        alert("Your session has expired. Please log in again.");
      }
    }
  }, []); 

  return (
    <div className="container">
      <div className="heading">
        Create Guest Account{" "}
        <img
          src="https://img.icons8.com/?size=40&id=o1jbKGDkJEkU&format=png&color=000000"
          alt=""
        />
      </div>
      <form onSubmit={handleSubmit} className="form">
        <input
          required
          className="input"
          type="text"
          name="username"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <button className="login-button" type="submit">
          Sign In
        </button>
      </form>

      <span className="agreement">
        <a href="#">Learn user license agreement</a>
      </span>
    </div>
  );
};
