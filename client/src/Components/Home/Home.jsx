import React, { useEffect,  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewMovies, fetchTrendingMovies } from "../../Store/MoviesSlice";
import { fetchNewTV,fetchPopularTV } from "../../Store/TVShowsSlice";
import { fetchPeople } from "../../Store/PeopleSlice";
import { Card } from "../Card/Card";
import { PeopleCard } from "../Card/PeopleCard/PeopleCard";
import { Loading } from "../Loading/Loading";
import Carousel from "../Carousel/Carousel";
import MainCarousel from "../Carousel/MainCarousel/MainCarousel";
import "./Home.css";

export const Home = () => {
  const dispatch = useDispatch();
  const {
    trendingMovies,
    loading: trendingMLoading,
    error: trendingMError,
  } = useSelector((state) => state.TrendingMovies);

  const {
    newMovies,
    loading: newMLoading,
    error: newMError,
  } = useSelector((state) => state.NewMovies);

  const {
    newTVShows,
    loading: newTVLoading,
    error: newTVError,
  } = useSelector((state) => state.NewTVShows);
  const {
    popularTVShows,
    loading: popularTVLoading,
    error: popularTVError,
  } = useSelector((state) => state.PopularTVShows);

  const {people , loading:peopleLoading, error:peopleError}= useSelector((state)=> state.People)
  useEffect(() => {
    dispatch(fetchTrendingMovies());
    dispatch(fetchNewMovies());
    dispatch(fetchNewTV());
    dispatch(fetchPopularTV());
    dispatch(fetchPeople())
  }, [dispatch]);

  

  if (trendingMLoading || newMLoading || newTVLoading || popularTVLoading || peopleLoading) {
    return <Loading />;
  }

  if (trendingMError || newMError || newTVError || popularTVError || peopleError) {
    return <div>Error: {trendingMError || newMError || newTVError || popularTVError || peopleError}</div>;
  }
  return (
    <div className="home">
      <div className="main-carousel">
          <MainCarousel />
      </div>
      <div className="trending m-left">
        <h2 className="h2">Trending Movies</h2>
        <div className="carousel-1 ">
          <Carousel components={

            trendingMovies.map((movie) => (
              <Card
                id={movie.id}
                type="Movie"
                key={movie.id}
                title={movie.title}
                poster={movie.poster_path}
                releaseDate={movie.release_date.slice(0,4)}
              />
            ))
          } />
        </div>
      </div>
      <div className="new-release m-left">
        <h2 className="h2">New Release</h2>
        <div className="carousel-2 ">
          <Carousel components={
          newMovies.map((movie) => (
            <Card
            id={movie.id}
              key={movie.id}
              type="Movie"
              title={movie.title}
              poster={movie.poster_path}
            />
          ))
          } />
        </div>
      </div>
      <div className="new-tv-shows m-left">
        <h2 className="h2">New TV Shows</h2>
        <div>{/* same carousel as carousel 1 */}
          <Carousel components={
        newTVShows.map((show) => (
            <Card
            id={show.id}
            type="TV Show"
              key={show.id}
              title={show.name}
              poster={show.poster_path}
            />
          ))
          } />
        </div>
      </div>
      <div className="popular-tv-shows m-left">
        <h2 className="h2">Popular TV Shows</h2>
        <div>
          <Carousel components={
        popularTVShows.map((show) => (
            <Card
            id={show.id}
              key={show.id}
              type="TV Show"
              title={show.name}
              poster={show.poster_path}
              //releaseDate={show.release_date.slice(0,4)}
            />
          ))
          } />
        </div>
      </div>
      <div className="top-actors m-left">
        <h2 className="h2">Top Actors</h2>
        <div >
          <Carousel components={
        people.map((item) => (
            <PeopleCard
              key={item.id}
              title={item.name}
              poster={item.profile_path}
            />
          ))
          } typeOfCard='people'/>
        </div>
      </div>

    </div>
  );
};
