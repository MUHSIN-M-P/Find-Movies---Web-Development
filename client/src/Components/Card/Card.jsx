import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AnimatedModal from "../Modal/Modal";
import "./Card.css";
import { useSelector } from "react-redux";
export const Card = ({ id, title, type, poster, releaseDate }) => {
  const { token } = useSelector((state) => state.Authentication);
  const [isModalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  const addToWatchlist = async () => {
    if (token) {
      try {
        fetch("http://localhost:5000/watch-list", {
          method: "POST",
          credentials: "include", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
            movie_or_tvshow: type === "Movie" ? "movie" : "tvShow",
          }),
        });
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.message);
        } else {
          console.error("Error in adding to watch list :", error);
        }
      }
    } else {
      setModalOpen(true);
    }
  };
  return (
    <div className="card-item">
      <div className="image-container">
        <img
          src={`https://image.tmdb.org/t/p/w500${poster}`}
          alt={title}
          className="movie-poster"
        />
        <Link to={`/${type === "Movie" ? "movie" : "tvShow"}/${id}`}>
          <div className="play-button"></div>
        </Link>
        {token && (
          <button onClick={addToWatchlist} className="add-to-list">
            Add to My List
          </button>
        )}
      </div>
      <div className="movie-details-card">
        <h4>{title}</h4>
        <p>{releaseDate}</p>
      </div>
      <AnimatedModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        closeModal={closeModal}
      />
    </div>
  );
};
