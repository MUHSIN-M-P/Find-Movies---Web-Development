import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false, 
  sessionId: null, // For guests
  token: null, // For logged-in users
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.sessionId = null; // Clear sessionId on login
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.sessionId = null;
    },
    setGuestSession(state, action) {
      state.isAuthenticated = true;
      state.sessionId = action.payload.sessionId;
      state.token = null; // Clear token for guests
    },
  },
});

export const { login, logout, setGuestSession } = authSlice.actions;

export default authSlice.reducer;
