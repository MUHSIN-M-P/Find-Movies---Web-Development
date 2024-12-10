
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPeople = createAsyncThunk(
  'movies/fetchPeople',
  async () => {
    const url = 'https://api.themoviedb.org/3/person/popular';
    const apiKey = import.meta.env.VITE_TMDB_API_RAT;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    return data.results;
  }
);

const peopleSlice = createSlice({
  name: 'people',
  initialState: {
    people: [], 
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPeople.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPeople.fulfilled, (state, action) => {
        state.loading = false;
        state.people = action.payload; 
      })
      .addCase(fetchPeople.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default peopleSlice.reducer;
