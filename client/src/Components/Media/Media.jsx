import React, { useEffect, useState } from "react";
import "./Media.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMImages, fetchMVideos } from "../../Store/MoviesSlice";
import { Loading } from "../Loading/Loading";
import MediaCarousel from "../Carousel/MediaCarousel/MediaCarousel";
export const Media = () => {
  const [category, setCategory] = useState("Videos");
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    movieVideos,
    loading: VideosLoading,
    error: VideosError,
  } = useSelector((state) => state.MovieVideos);
  const {
    movieImages,
    loading: ImagesLoading,
    error: ImagesError,
  } = useSelector((state) => state.MovieImages);
  useEffect(() => {
    dispatch(fetchMVideos(id));
    dispatch(fetchMImages(id));
  }, [dispatch, id]);

  if (VideosLoading || ImagesLoading) {
    return <Loading />;
  }

  if (VideosError || ImagesError) {
    return (
      <div>
        Error : {VideosError},{ImagesError}
      </div>
    );
  }
  return (
    <div className="media-container">
      <div>
        <h3>Media</h3>
        <div className="category">
          <p
            id={`${category === "Videos" ? "selected-category" : null}`}
            onClick={() => setCategory("Videos")}
          >
            Videos
          </p>
          <p
            id={`${category === "Images" ? "selected-category" : null}`}
            onClick={() => setCategory("Images")}
          >
            Images
          </p>
        </div>
      </div>
      <div>
        <MediaCarousel
          category={category}
          videos={movieVideos}
          images={movieImages.backdrops}
        />
      </div>
    </div>
  );
};
