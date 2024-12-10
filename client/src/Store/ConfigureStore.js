import { configureStore } from "@reduxjs/toolkit";
import {trendingMoviesReducer,newMoviesReducer,movieDetailsReducer,recommendedMoviesReducer,movieVideosReducer,movieImagesReducer, popularMoviesReducer, movieReviewsReducer} from './MoviesSlice'
import { newTVShowsReducer,popularTVShowsReducer, tvDetailsReducer, tvImagesReducer, tvRecommendationsReducer, tvReviewsReducer, tvVideosReducer } from "./TVShowsSlice";
import peopleReducer from './PeopleSlice'
import authReducer from './authSlice'
export const store = configureStore({
        reducer:{
                Authentication: authReducer,
                //Movies
                TrendingMovies:trendingMoviesReducer,
                NewMovies: newMoviesReducer,
                PopularMovies : popularMoviesReducer,
                MovieDetails: movieDetailsReducer,
                MovieVideos : movieVideosReducer ,
                MovieImages : movieImagesReducer,
                MovieReviews : movieReviewsReducer,
                RecommendedMovies : recommendedMoviesReducer,
                //TV Shows
                NewTVShows : newTVShowsReducer,
                PopularTVShows : popularTVShowsReducer,
                TVShowDetails: tvDetailsReducer,
                TVShowVideos : tvVideosReducer,
                TVShowImages : tvImagesReducer,
                TVShowReviews : tvReviewsReducer,
                RecommendedTVShows: tvRecommendationsReducer,
                //people
                People : peopleReducer,
        }
})