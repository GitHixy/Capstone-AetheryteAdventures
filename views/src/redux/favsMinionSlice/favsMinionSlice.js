import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const addMinionToFavourites = createAsyncThunk(
  'favourites/addMinionToFavourites',
  async ({ userId, minionId }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/${userId}/favourites/minions`, { minionId });
      console.log(res.data);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const removeMinionFromFavourites = createAsyncThunk(
  'favourites/removeMinionFromFavourites',
  async ({ userId, minionId }, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/users/${userId}/favourites/minions`, { data: { minionId } });
      return res.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);


const favouritesSlice = createSlice({
    name: 'minionFavourites',
    initialState: {
      favs: [],
      loading: 'idle',
      error: null
    },
    reducers: { },
    extraReducers: (builder) => {
      builder
        .addCase(addMinionToFavourites.pending, (state) => {
          state.loading = 'loading';
        })
        .addCase(addMinionToFavourites.fulfilled, (state, action) => {
          state.loading = 'succeeded';          
          state.favs = action.payload.payload;          
        })
        .addCase(addMinionToFavourites.rejected, (state, action) => {
          state.loading = 'failed';
          state.error = action.payload.message;
        })
        .addCase(removeMinionFromFavourites.pending, (state) => {
          state.loading = 'loading';
        })
        .addCase(removeMinionFromFavourites.fulfilled, (state, action) => {          
          state.loading = 'succeeded';
          state.favs = action.payload.payload;
        })
        .addCase(removeMinionFromFavourites.rejected, (state, action) => {
          state.loading = 'failed';
          state.error = action.payload.message;
        });
    }
  });

  export default favouritesSlice.reducer;