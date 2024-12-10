import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieDetails } from "../../Store/MoviesSlice";
import axios from "axios";

export const WatchlistItem = ({ id, movie_or_tvshow,refreshWatchList }) => {
  const dispatch = useDispatch();
  const movieDetails = useSelector(
    (state) => state.MovieDetails.movieDetails?.[id]
  );
  const loading = useSelector((state) => state.MovieDetails.loading?.[id]);
  const error = useSelector((state) => state.MovieDetails.error?.[id]);
  useEffect(() => {
    dispatch(fetchMovieDetails(id));
  }, [dispatch, id]);


  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error in loading content : {error}</p>;
  }

  if (!movieDetails) {
    return <p>No movie details available.</p>;
  }

  const handleDelete = async () => {
    try {

      const response = await axios.delete(
        `http://localhost:5000/watch-list?id=${id}`,
        {
          withCredentials: true,
        })
        refreshWatchList();
    } catch (error) {
      console.log("Error in removing Item from watch list.",error);
    }
  };
  return (
    <div className="watch-list-item">
      <img
        src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
        alt={movieDetails.title}
        className="movie-poster"
      />
      <div>
        <h2>{movieDetails.title}</h2>
        {movieDetails.genres?.length > 0 &&
          movieDetails.genres.map((item, index) => (
            <p className="category" key={index}>
              {item.name}
            </p>
          ))}

        <p>{movieDetails.release_date}</p>
        <p>{movie_or_tvshow}</p>
        <p>rating : {movieDetails.vote_average}</p>
      </div>
      <button onClick={handleDelete} className="remove-btn">
        <div className="sign">
          <svg
            viewBox="0 0 16 16"
            className="bi bi-trash3-fill"
            fill="currentColor"
            height="18"
            width="18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"></path>
          </svg>
        </div>

        <div className="text">Delete</div>
      </button>
    </div>
  );
};
