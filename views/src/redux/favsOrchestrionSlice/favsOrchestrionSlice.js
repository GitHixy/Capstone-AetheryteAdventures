import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const addOrchestrionToFavourites = createAsyncThunk(
  'favourites/addOrchestrionToFavourites',
  async ({ userId, orchestrionId }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/${userId}/favourites/orchestrions`, { orchestrionId });
      console.log(res.data);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const removeOrchestrionFromFavourites = createAsyncThunk(
  'favourites/removeOrchestrionFromFavourites',
  async ({ userId, orchestrionId }, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/users/${userId}/favourites/orchestrions`, { data: { orchestrionId } });
      return res.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);


const favouritesSlice = createSlice({
    name: 'orchestrionFavourites',
    initialState: {
      favs: [],
      loading: 'idle',
      error: null
    },
    reducers: { },
    extraReducers: (builder) => {
      builder
        .addCase(addOrchestrionToFavourites.pending, (state) => {
          state.loading = 'loading';
        })
        .addCase(addOrchestrionToFavourites.fulfilled, (state, action) => {
          state.loading = 'succeeded';          
          state.favs = action.payload.payload;          
        })
        .addCase(addOrchestrionToFavourites.rejected, (state, action) => {
          state.loading = 'failed';
          state.error = action.payload.message;
        })
        .addCase(removeOrchestrionFromFavourites.pending, (state) => {
          state.loading = 'loading';
        })
        .addCase(removeOrchestrionFromFavourites.fulfilled, (state, action) => {          
          state.loading = 'succeeded';
          state.favs = action.payload.payload;
        })
        .addCase(removeOrchestrionFromFavourites.rejected, (state, action) => {
          state.loading = 'failed';
          state.error = action.payload.message;
        });
    }
  });

  export default favouritesSlice.reducer;