import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import api from '../api';

// Thunk action creator for asynchronous login operation
export const loginAsync = createAsyncThunk(
  'auth/login', // Action type prefix
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await api.post('/users/login', { email, password });
      return response.data; // Assuming response.data contains user and token
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Slice for authentication state management
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    // Reducer for setting loading state and clearing error
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    // Reducer for setting user and token on successful login
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      // Store token in local storage
      localStorage.setItem('token', action.payload.token);
       // Navigate to the about page
       const navigate = useNavigate();
       navigate('/about');
    },
    // Reducer for setting loading state and error on login failure
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Reducer for handling pending state of loginAsync thunk
    builder.addCase(loginAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    // Reducer for handling fulfilled state of loginAsync thunk
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    // Reducer for handling rejected state of loginAsync thunk
    builder.addCase(loginAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

// Exporting actions from authSlice
export const { loginStart, loginSuccess, loginFailure } = authSlice.actions;

// Exporting authReducer
export default authSlice.reducer;
