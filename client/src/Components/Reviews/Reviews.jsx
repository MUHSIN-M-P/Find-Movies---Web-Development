import React, { useEffect } from "react";
import "./Reviews.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchMReviews } from "../../Store/MoviesSlice";
import { fetchTVReviews } from "../../Store/TVShowsSlice";

export const Reviews = ({ id,movie_or_tvshow }) => {
  const { movieReviews, loading:Mloading, error:MError } = useSelector(
    (state) => state.MovieReviews
  );
  const { TVReviews,loading:TVLoading, error:TVError}=useSelector(state=>state.TVShowReviews)
  const dispatch = useDispatch();
  const type = movie_or_tvshow==="movie"?movieReviews:TVReviews

  useEffect(() => {
    if(movie_or_tvshow==="movie"){
      dispatch(fetchMReviews(id));

    }else{
      dispatch(fetchTVReviews(id))
    }
  }, [dispatch, id]);

  if (Mloading||TVLoading) {
    return <div>Loading...</div>;
  }

  if (MError||TVError) {
    return <div>Failed to fetch Movie Reviews: {MError} {TVError}</div>;
  }
  return (
    <div>
      {type ? (
        type.slice(0, 5).map((item) => (
          <div className="review-item" key={item.id}>
            {console.log(item)}
            <img
              src={`https://image.tmdb.org/t/p/w500${item.author_details.avatar_path}`}
              alt="User Avatar"
              className="review-avatar"
            />
            <div className="review-content">
              <span className="review-username">{item.author}</span>
              <p dangerouslySetInnerHTML={{ __html: item.content.slice(0,250) }} className="review-text"></p>
            </div>
          </div>
        ))
      ) : null}
    </div>
  );
};
