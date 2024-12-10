import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchMovieDetails,
  fetchRecommended,
  fetchMVideos,
} from "../../Store/MoviesSlice";
import { Loading } from "../Loading/Loading";
import "./MovieDetails.css";
import Carousel from "../Carousel/Carousel";
import { Card } from "../Card/Card";
import {Media} from '../Media/Media'
import { Reviews } from "../Reviews/Reviews";
import AnimatedModal from "../Modal/Modal";

export const MovieDetails = () => {
  
  const { id } = useParams();
  const dispatch = useDispatch();
  const [trailerKey, setTrailerKey] = useState("");
  const { isAuthenticated, token } = useSelector(state=>state.Authentication);
  const movieDetails = useSelector(
    (state) => state.MovieDetails.movieDetails?.[id]
  );
  const MDetailsLoading = useSelector(
    (state) => state.MovieDetails.loading?.[id]
  );
  const MDetailsError = useSelector((state) => state.MovieDetails.error?.[id]);
  const {
    movieVideos,
    loading: VideosLoading,
    error: VideosError,
  } = useSelector((state) => state.MovieVideos);

  const {
    recommendedMovies,
    loading: MRecommendedLoading,
    error: MRecommendedError,
  } = useSelector((state) => state.RecommendedMovies);

  useEffect(() => {
    dispatch(fetchMovieDetails(id));
    dispatch(fetchMVideos(id));
    dispatch(fetchRecommended(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (movieVideos && movieVideos.length > 0) {
      const trailer = movieVideos.find(
        (item) => item.name === "Official Trailer"
      );
      if (trailer) {
        setTrailerKey(trailer.key);
      } else {
        console.warn("No 'Official Trailer' found");
        setTrailerKey("");
      }
    }
  }, [movieVideos]);

  const movie_or_tvshow = "movie";
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

  if (MDetailsLoading || MRecommendedLoading) {
    return <Loading />;
  }

  if (MDetailsError || MRecommendedError) {
    return <div>Error: {error}</div>;
  }

  if (!movieDetails) {
    return <p>No movie details available.</p>;
  }
  //1. Guard against undefined
  //Update your component logic to account for scenarios where movieDetails might be undefined:

  const timeLength =
    Math.floor(movieDetails.runtime / 60) +
    " hr " +
    (movieDetails.runtime % 60) +
    " min";

  return (
    <div className="movie-details-page">
      <div className="main-section">
        <div className="container-1">
          <img
            src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
            alt=""
            className="poster-img"
          />
          <div className="options">
            <button
              onClick={() => {
                if (!isAuthenticated) {
                  setModalOpen(true);
                }
              }}
            >
              <img
                src="https://img.icons8.com/?size=25&id=33481&format=png&color=7b61ff"
                alt="likes"
                className="button-icon"
              />
              like
            </button>
            <button>
              <img
                src="https://img.icons8.com/?size=25&id=TDCU7KRViM2Q&format=png&color=7b61ff"
                alt="share"
                className="button-icon"
              />
              share
            </button>
          </div>
        </div>
        <div className="container-2">
          <h1>{movieDetails.title}</h1>
          <h3>Original Title : {movieDetails.original_title}</h3>
          <div className="meta-info">
            <p>{movieDetails.original_language}</p>
            <p>{timeLength}</p>
            <p>{movieDetails.release_date}</p>
          </div>
          <div className="meta-info">
            {movieDetails.genres?.length > 0 &&
              movieDetails.genres.map((item) => <p>{item.name}</p>)}
          </div>
          <p className="rating">
            Rating : <span>{movieDetails.vote_average}</span>
          </p>

          <p className="description">
            {movieDetails.overview} . {movieDetails.tagline}
          </p>
          <div className="buttons">
            <button className="btn-1" onClick={addToWatchlist}>
              Add to Watch List
              <img
                src="https://img.icons8.com/?size=25&id=82461&format=png&color=ffffff"
                alt="Add to Watch List"
                className="button-icon"
              />
            </button>
            <button className="btn-1">
              <a
                href={movieDetails.homepage}
                target="_blank"
                style={{ textDecoration: "none" }}
              >
                Watch Now
                <img
                  src="https://img.icons8.com/?size=25&id=bqOL9fT7XSdo&format=png&color=ffffff"
                  alt="Watch Now"
                />
              </a>
            </button>
          </div>
        </div>
      </div>
      <div className="bottom">
        <h2>Watch Trailer</h2>
        <div className="iframe-container">
          {trailerKey ? (
            <iframe
              width="1045"
              height="588"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          ) : (
            <p className="trailer-not-available">😭Trailer not available</p>
          )}
        </div>
        <Media />
        <div className="review">
          <h2>Reviews</h2>
          <Reviews id={id} movie_or_tvshow={"movie"}/>
          {isAuthenticated && (
            <>
              <h3>Write A Review</h3>
              <textarea
                placeholder="Write Your Opinion..."
                name="review-of-movie"
                id=""
              ></textarea>
              <button className="btn-1">Submit</button>
            </>
          )}
        </div>
        <div className="recommended-movies">
          <h2 className="h2">Recommended Movies</h2>
          <Carousel
            components={recommendedMovies.map((item) => (
              <Card
                id={item.id}
                key={item.key}
                title={item.title}
                poster={item.poster_path}
              />
            ))}
            typeOfCard="Recommended"
          />
        </div>
      </div>
      <AnimatedModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        closeModal={closeModal}
      />
    </div>
  );
};
