import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const addAchievementToFavourites = createAsyncThunk(
  'favourites/addAchievementToFavourites',
  async ({ userId, achievementId }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/${userId}/favourites/achi`, { achievementId });
      console.log(res.data);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const removeAchievementFromFavourites = createAsyncThunk(
  'favourites/removeAchievementFromFavourites',
  async ({ userId, achievementId }, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/users/${userId}/favourites/achi`, { data: { achievementId } });
      return res.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);


const favouritesSlice = createSlice({
    name: 'favourites',
    initialState: {
      favs: [],
      loading: 'idle',
      error: null
    },
    reducers: { },
    extraReducers: (builder) => {
      builder
        .addCase(addAchievementToFavourites.pending, (state) => {
          state.loading = 'loading';
        })
        .addCase(addAchievementToFavourites.fulfilled, (state, action) => {
          state.loading = 'succeeded';          
          state.favs = action.payload.payload;          
        })
        .addCase(addAchievementToFavourites.rejected, (state, action) => {
          state.loading = 'failed';
          state.error = action.payload.message;
        })
        .addCase(removeAchievementFromFavourites.pending, (state) => {
          state.loading = 'loading';
        })
        .addCase(removeAchievementFromFavourites.fulfilled, (state, action) => {          
          state.loading = 'succeeded';
          state.favs = action.payload.payload;
        })
        .addCase(removeAchievementFromFavourites.rejected, (state, action) => {
          state.loading = 'failed';
          state.error = action.payload.message;
        });
    }
  });
  
  
  
  export default favouritesSlice.reducer;
  