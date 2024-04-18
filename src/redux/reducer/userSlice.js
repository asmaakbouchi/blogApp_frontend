// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  isAuthenticated: localStorage.getItem("tokenkey") ? true : false, // Check if token exists
  loading: false
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    LoginStart: (state) => {
      state.error = null;
      state.loading = true;
    },
    LoginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
      state.isAuthenticated = true;
    },
    LoginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    Logout: (state) => {
      state.isAuthenticated = false; // Set isAuthenticated to false when logging out
      state.loading = false;
      state.error = null;
    }
  }
});

export const { LoginStart, LoginSuccess, LoginFailure, Logout } = userSlice.actions;

export default userSlice.reducer;
