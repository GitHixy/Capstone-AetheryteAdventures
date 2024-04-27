import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchFavourites = createAsyncThunk(
  'favourites/fetchFavourites',
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${userId}/favourites`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


const favouritesSlice = createSlice({
    name: 'allFavourites',
    initialState: {
      data: [],
      status: 'idle',  
      error: null
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchFavourites.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchFavourites.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.data = action.payload;
        })
        .addCase(fetchFavourites.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        });
    }
  });
  
  export default favouritesSlice.reducer;