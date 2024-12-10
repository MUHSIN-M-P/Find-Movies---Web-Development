import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Loading } from "../Loading/Loading";
import "./TVShowDetails.css";
import Carousel from "../Carousel/Carousel";
import AnimatedModal from "../Modal/Modal";
import { Card } from "../Card/Card";
import {
  fetchTVDetails,
  fetchTVRecommendations,
  fetchTVVideos,
} from "../../Store/TVShowsSlice";
import { Reviews } from "../Reviews/Reviews";
export const TVShowDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState("");
  const { isAuthenticated, token } = useSelector(
    (state) => state.Authentication
  );

  const {
    tvDetails,
    loading: tvDetailsLoading,
    error: tvDetailsError,
  } = useSelector((state) => state.TVShowDetails);

  const {
    tvVideos,
    loading: VideosLoading,
    error: VideosError,
  } = useSelector((state) => state.TVShowVideos);

  const {
    tvRecommendations,
    loading: tvRecommendedLoading,
    error: tvRecommendedError,
  } = useSelector((state) => state.RecommendedTVShows);
  useEffect(() => {
    dispatch(fetchTVDetails(id));
    dispatch(fetchTVVideos(id));
    dispatch(fetchTVRecommendations(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (tvVideos && tvVideos.length > 0) {
      const trailer = tvVideos.find((item) => item.name === "Official Trailer");
      if (trailer) {
        setTrailerKey(trailer.key);
      } else {
        console.warn("No 'Official Trailer' found");
        setTrailerKey("");
      }
    }
  }, [tvVideos]);

  const movie_or_tvshow = "tvshow";
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
            movie_or_tvshow: movie_or_tvshow,
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

  if (tvDetailsLoading || tvRecommendedLoading) {
    return <Loading />;
  }

  if (tvDetailsError || tvRecommendedError) {
    return <div>Error: {tvDetailsError} { tvRecommendedError}</div>;
  }

  if (!tvDetails) {
    return <p>tv Show details are not available.</p>;
  }
  const lastSeason = tvDetails?.seasons?.[tvDetails.seasons.length - 1];
if (!lastSeason) {
  console.warn("Last season not found or seasons data is missing.");
}
  return (
    <div className="movie-details-page">
      <div className="main-section">
        <div className="container-1">
          <img
            src={`https://image.tmdb.org/t/p/w500${tvDetails.poster_path}`}
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
          <h1>{tvDetails.name}</h1>
          <h3>Original Title : {tvDetails.original_name}</h3>
          <div className="meta-info">
            <p>{tvDetails.original_language}</p>
            <p>{tvDetails.number_of_seasons} Seasons</p>
            <p>{tvDetails.first_air_date}</p>
          </div>
          <div className="meta-info">
            {tvDetails &&
              tvDetails.genres &&
              tvDetails.genres.length > 0 &&
              tvDetails.genres.map((item) => <p key={item.id}>{item.name}</p>)}
          </div>
          <p className="rating">
            Rating : <span>{tvDetails.vote_average}</span>
          </p>

          <p className="description">
            {tvDetails.overview} . {tvDetails.tagline}
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
              <a href={tvDetails.homepage} target="_blank">
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

        {lastSeason && (
          <div className="last-season">
            <h3>Last Season</h3>
            <div className="outer-container">
              <img
                src={`https://image.tmdb.org/t/p/w500${lastSeason.poster_path}`}
                alt=""
              />
              <div>
                <h4>{lastSeason.name}</h4>
                <h6>{lastSeason.air_date}</h6>
                <p>{lastSeason.overview}</p>
                <h5>
                  Status :{" "}
                  {tvDetails.in_production ? "In Production" : "Completed"}
                </h5>
              </div>
            </div>
          </div>
        )}

        <div className="review">
          <h2>Reviews</h2>
          <Reviews id={id} movie_or_tvshow={movie_or_tvshow} />
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
          <h2 className="h2">Recommended TV Shows</h2>
          <Carousel
            components={tvRecommendations.map((item) => (
              <Card
                id={item.id}
                key={item.key}
                title={item.title}
                type="tv show"
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
