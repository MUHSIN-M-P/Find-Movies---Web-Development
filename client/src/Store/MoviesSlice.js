import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTrendingMovies = createAsyncThunk(
  "movies/fetchTrendingMovies",
  async (_, { rejectWithValue }) => {
    const url =
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
    const apiKey = import.meta.env.VITE_TMDB_API_RAT;
    // for react app process.env.REACT_APP_API_KEY
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Failed to fetch Trending Movies");
      }
      const json = await response.json();
      return json.results;
    } catch (error) {
      return rejectWithValue(error.message);

    }
  }
);

export const fetchNewMovies = createAsyncThunk(
  "movie/fetchNewMovies",
  async (_, { rejectWithValue }) => {
    const url = "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
    const apiKey = import.meta.env.VITE_TMDB_API_RAT;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Failed to fetch New Release");
      }
      const json = await response.json();
      return json.results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPopularMovies = createAsyncThunk(
  "movie/fetchPopularMovies",
  async (_, { rejectWithValue }) => {
    const url = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
    const apiKey = import.meta.env.VITE_TMDB_API_RAT;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Failed to fetch New Release");
      }
      const json = await response.json();
      return json.results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchMovieDetails = createAsyncThunk(
  "movie/fetchDetails",
  async (id, { rejectWithValue }) => {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
    const apiKey = import.meta.env.VITE_TMDB_API_RAT;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Failed to fetch movie details");
      }
      const json = await response.json();
      return json; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchMVideos = createAsyncThunk(
  "movie/fetchMovieVideos",
  async (id, { rejectWithValue }) => {
    const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
    const apiKey = import.meta.env.VITE_TMDB_API_RAT;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Failed to fetch movie videos");
      }
      const json = await response.json();
      return json.results; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchMImages = createAsyncThunk(
  "movie/fetchMovieImages",
  async (id, { rejectWithValue }) => {
    const url = `https://api.themoviedb.org/3/movie/${id}/images`;
    const apiKey = import.meta.env.VITE_TMDB_API_RAT;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Failed to fetch movie images");
      }
      const json = await response.json();
      return json; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchMReviews = createAsyncThunk(
  "movie/fetchMReviews",async(id,{rejectWithValue})=>{
    const url = `https://api.themoviedb.org/3/movie/${id}/reviews`
    const apiKey = import.meta.env.VITE_TMDB_API_RAT;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Failed to fetch movie images");
      }
      const json = await response.json();
      return json.results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

export const fetchRecommended = createAsyncThunk(
  "movie/fetchRecommendedMovies",
  async (id, { rejectWithValue }) => {
    const url = `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`;
    const apiKey = import.meta.env.VITE_TMDB_API_RAT;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Failed to fetch Recommended movies");
      }
      const json = await response.json();
      return json.results; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const trendingMoviesSlice = createSlice({
  name: "TrendingMovies",
  initialState: {
    trendingMovies: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendingMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.trendingMovies = action.payload;
      })
      .addCase(fetchTrendingMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // The error message from rejectWithValue
      });
  },
});

const newMoviesSlice = createSlice({
  name: "New Release",
  initialState: {
    newMovies: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.newMovies = action.payload;
      })
      .addCase(fetchNewMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const popularMoviesSlice = createSlice({
  name: "Popular",
  initialState: {
    popularMovies: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.popularMovies = action.payload;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const movieDetailsSlice = createSlice({
  name: "Movie Details",
  initialState: {
    movieDetails: {}, // changed to store multiple objects , normal way saves only one thing at a time next item over 
    
    loading: {}, // Track loading state by ID
    error: {}, 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieDetails.pending, (state, action) => {
        const id = action.meta.arg; // Extract the movie ID
        state.loading[id] = true;  
        state.error[id] = null;    
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        const id = action.meta.arg; 
        state.movieDetails[id] = action.payload; 
        state.loading[id] = false;       
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        const id = action.meta.arg; 
        state.loading[id] = false; 
        state.error[id] = action.payload; 
      });
    },
  });
const movieVideosSlice = createSlice({
  name: "Movie Details",
  initialState: {
    movieVideos: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.movieVideos = action.payload;
      })
      .addCase(fetchMVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const movieImagesSlice = createSlice({
  name: "Movie Details",
  initialState: {
    movieImages: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMImages.fulfilled, (state, action) => {
        state.loading = false;
        state.movieImages = action.payload;
      })
      .addCase(fetchMImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const MovieReviewSlice = createSlice({
  name: "Movie Reviews",
  initialState : {
    movieReviews : [],
    loading:false,
    error:null,
  },
  reducers : {},
  extraReducers:(builder)=>{
    builder
        .addCase(fetchMReviews.pending,(state)=>{
          state.loading=true;
          state.error=null
        })
        .addCase(fetchMReviews.fulfilled,(state,action)=>{
          state.loading=false
          state.error=null
          state.movieReviews=action.payload
        })
        .addCase(fetchMReviews.rejected,(state,action)=>{
          state.loading = false
          state.error=action.payload
        })
  }
})

const recommendedMovieSlice = createSlice({
  name: "Movie Details",
  initialState: {
    recommendedMovies: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommended.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecommended.fulfilled, (state, action) => {
        state.loading = false;
        state.recommendedMovies = action.payload;
      })
      .addCase(fetchRecommended.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const trendingMoviesReducer = trendingMoviesSlice.reducer;

export const newMoviesReducer = newMoviesSlice.reducer;

export const popularMoviesReducer = popularMoviesSlice.reducer;

export const movieDetailsReducer = movieDetailsSlice.reducer;

export const movieVideosReducer = movieVideosSlice.reducer;

export const movieImagesReducer = movieImagesSlice.reducer;

export const movieReviewsReducer = MovieReviewSlice.reducer;

export const recommendedMoviesReducer = recommendedMovieSlice.reducer;