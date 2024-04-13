// src/features/postSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

export const createPostAsync = createAsyncThunk(
  'post/createPost',
  async (postData, thunkAPI) => {
    try {
      const response = await api.post('/posts', postData, {
        headers: {
          'Content-Type': 'application/json',
          'auth': `Bearer ${localStorage.getItem('tokenkey')}`, // Assuming you store token in localStorage after login
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPostAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPostAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createPostAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default postSlice.reducer;
