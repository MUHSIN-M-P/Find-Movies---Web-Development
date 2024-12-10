import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularMovies } from "../../../Store/MoviesSlice";
import { Loading } from "../../Loading/Loading";
import "./MainCarousel.css";

const MainCarousel = () => {
  const dispatch = useDispatch();
  const {
    popularMovies,
    loading: popularMLoading,
    error: popularMError,
  } = useSelector((state) => state.PopularMovies);

  const [id, setId] = useState(null);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [item, setItem] = useState(null);

  useEffect(() => {
    dispatch(fetchPopularMovies());
  }, [dispatch]);

  useEffect(() => {
    if (popularMovies.length > 0 && !id) {
      const firstMovieId = popularMovies[0].id;
      setId(firstMovieId);
      setItem(popularMovies[0]);
    }
  }, [popularMovies, id]);

  const handleThumbnailClick = (index) => {
    setCurrentPhoto(index);
    const selectedMovieId = popularMovies[index].id;
    setId(selectedMovieId);
    setItem(popularMovies[index]);
  };

  if (popularMLoading) {
    return <Loading />;
  }

  if (popularMError) {
    return <div>Error: {popularMError}</div>;
  }
  
  return (
    <div className="video-slider">
      <div className="main-video">
        {item ? (
          <>
            <img
            className="cover"
              key={id}
              src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
              alt={item.title}
            />
            <div className="elements">
              <h1>{item.title}</h1>
              <div>
                <p className="rating">
                  Rating : <span>{item.vote_average}</span>
                </p>
                <p className="year-of-release">{item.release_date?.slice(0, 4)}</p>
              </div>
              <p>{item.overview?.slice(0, 230)}</p>
              <div className="buttons">
                <button className="play-now">
                  Play Now
                  <img
                    src="https://img.icons8.com/?size=25&id=bqOL9fT7XSdo&format=png&color=ffffff"
                    alt=""
                  />
                </button>
                <button className="watch-later">Watch Later</button>
              </div>
            </div>
          </>
        ) : (
          <p>Loading movie details...</p>
        )}
      </div>

      {/* Thumbnails */}
      <div className="thumbnail-row">
        {popularMovies.slice(0, 5).map((movie, index) => (
          <img
            key={movie.id}
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt={movie.title}
            className={`thumbnail ${index === currentPhoto ? "active" : ""}`}
            onClick={() => handleThumbnailClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default MainCarousel;
