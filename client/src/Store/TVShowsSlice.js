import { createSlice,createAsyncThunk,  } from "@reduxjs/toolkit";


export const fetchNewTV = createAsyncThunk(
        "TV/fetchNewTVShows",
        async (_, { rejectWithValue }) => {
                const url =
                  "https://api.themoviedb.org/3/tv/airing_today";
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
                    throw new Error("Failed to fetch New TV Shows");
                  }
                  const json = await response.json();
                  return json.results;
                } catch (error) {
                  return rejectWithValue(error.message);
                }
              }
)

export const fetchPopularTV = createAsyncThunk(
        "TV/fetchPopularTVShows",
        async (_, { rejectWithValue }) => {
                const url =
                  "https://api.themoviedb.org/3/tv/popular";
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
                    throw new Error("Failed to fetch Popular TV Shows");
                  }
                  const json = await response.json();
                  return json.results;
                } catch (error) {
                  return rejectWithValue(error.message);
                }
              }
)

export const fetchTVDetails = createAsyncThunk(
        "TV/fetchTVDetails",
        async (id, { rejectWithValue }) => {
          const url =`https://api.themoviedb.org/3/tv/${id}?language=en-US`;
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
                    throw new Error("Failed to fetch Popular TV Shows");
                  }
                  const json = await response.json();
                  return json;
                } catch (error) {
                  return rejectWithValue(error.message);
                }
              }
)


export const fetchTVVideos = createAsyncThunk(
        "TV/fetchTVVideos",
        async (id, { rejectWithValue }) => {
          const url =`https://api.themoviedb.org/3/tv/${id}/videos`;

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
                    throw new Error("Failed to fetch TV videos");
                  }
                  const json = await response.json();
                  return json.results;
                } catch (error) {
                  return rejectWithValue(error.message);
                }
              }
)
export const fetchTVImages = createAsyncThunk(
        "TV/fetchTVImages",
        async (id, { rejectWithValue }) => {
          const url =`https://api.themoviedb.org/3/tv/${id}/images`;

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
                    throw new Error("Failed to fetch TV Images");
                  }
                  const json = await response.json();
                  return json.results;
                } catch (error) {
                  return rejectWithValue(error.message);
                }
              }
)


export const fetchTVReviews = createAsyncThunk(
  "movie/fetchTVReviews",async(id,{rejectWithValue})=>{
    const url = `https://api.themoviedb.org/3/tv/${id}/reviews`
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

export const fetchTVRecommendations = createAsyncThunk(
        "TV/fetchTVRecommendation",
        async (id, { rejectWithValue }) => {
                const url =`https://api.themoviedb.org/3/tv/${id}/recommendations`;
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
                    throw new Error("Failed to fetch TV Images");
                  }
                  const json = await response.json();
                  return json.results;
                } catch (error) {
                  return rejectWithValue(error.message);
                }
              }
)
const NewTVShowsSlice = createSlice({
        name: "NewTVShows",
        initialState: {
          newTVShows: [],
          loading: false,
          error: null,
        },
        reducers: {},
        extraReducers: (builder) => {
          builder
            .addCase(fetchNewTV.pending, (state) => {
              state.loading = true;
              state.error = null;
            })
            .addCase(fetchNewTV.fulfilled, (state, action) => {
              state.loading = false;
              state.newTVShows = action.payload;
            })
            .addCase(fetchNewTV.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload;
            });
        },
      });

      const PopularTVShowsSlice = createSlice({
        name: "PopularTVShows",
        initialState: {
          popularTVShows: [],
          loading: false,
          error: null,
        },
        reducers: {},
        extraReducers: (builder) => {
          builder
            .addCase(fetchPopularTV.pending, (state) => {
              state.loading = true;
              state.error = null;
            })
            .addCase(fetchPopularTV.fulfilled, (state, action) => {
              state.loading = false;
              state.popularTVShows = action.payload;
            })
            .addCase(fetchPopularTV.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload;
            });
        },
      });
      const TVDetailsSlice = createSlice({
        name: "TV Show Details",
        initialState: {
          tvDetails: [],
          loading: false,
          error: null,
        },
        reducers: {},
        extraReducers: (builder) => {
          builder
            .addCase(fetchTVDetails.pending, (state) => {
              state.loading = true;
              state.error = null;
            })
            .addCase(fetchTVDetails.fulfilled, (state, action) => {
              state.loading = false;
              state.tvDetails = action.payload;
            })
            .addCase(fetchTVDetails.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload;
            });
        },
      });
      const TVVideosSlice = createSlice({
        name: "TV Videos",
        initialState: {
          tvVideos: [],
          loading: false,
          error: null,
        },
        reducers: {},
        extraReducers: (builder) => {
          builder
            .addCase(fetchTVVideos.pending, (state) => {
              state.loading = true;
              state.error = null;
            })
            .addCase(fetchTVVideos.fulfilled, (state, action) => {
              state.loading = false;
              state.tvVideos = action.payload;
            })
            .addCase(fetchTVVideos.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload;
            });
        },
      });
      const TVImagesSlice = createSlice({
        name: "TV Images",
        initialState: {
          tvImages: [],
          loading: false,
          error: null,
        },
        reducers: {},
        extraReducers: (builder) => {
          builder
            .addCase(fetchTVImages.pending, (state) => {
              state.loading = true;
              state.error = null;
            })
            .addCase(fetchTVImages.fulfilled, (state, action) => {
              state.loading = false;
              state.tvImages = action.payload;
            })
            .addCase(fetchTVImages.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload;
            });
        },
      });

      const TVReviewSlice = createSlice({
        name: "TV Show Reviews",
        initialState : {
          TVReviews : [],
          loading:false,
          error:null,
        },
        reducers : {},
        extraReducers:(builder)=>{
          builder
              .addCase(fetchTVReviews.pending,(state)=>{
                state.loading=true;
                state.error=null
              })
              .addCase(fetchTVReviews.fulfilled,(state,action)=>{
                state.loading=false
                state.error=null
                state.TVReviews=action.payload
              })
              .addCase(fetchTVReviews.rejected,(state,action)=>{
                state.loading = false
                state.error=action.payload
              })
        }
      })
      

      const TVRecommendationSlice = createSlice({
        name: "TV Recommendation",
        initialState: {
          tvRecommendations: [],
          loading: false,
          error: null,
        },
        reducers: {},
        extraReducers: (builder) => {
          builder
            .addCase(fetchTVRecommendations.pending, (state) => {
              state.loading = true;
              state.error = null;
            })
            .addCase(fetchTVRecommendations.fulfilled, (state, action) => {
              state.loading = false;
              state.tvRecommendations = action.payload;
            })
            .addCase(fetchTVRecommendations.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload;
            });
        },
      });

export const newTVShowsReducer = NewTVShowsSlice.reducer;
export const popularTVShowsReducer = PopularTVShowsSlice.reducer;
export const tvDetailsReducer = TVDetailsSlice.reducer;
export const tvImagesReducer = TVImagesSlice.reducer;
export const tvVideosReducer = TVVideosSlice.reducer;
export const tvReviewsReducer = TVReviewSlice.reducer;
export const tvRecommendationsReducer = TVRecommendationSlice.reducer;