import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const addEmoteToFavourites = createAsyncThunk(
  'favourites/addEmoteToFavourites',
  async ({ userId, emoteId }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/${userId}/favourites/emotes`, { emoteId });
      console.log(res.data);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const removeEmoteFromFavourites = createAsyncThunk(
  'favourites/removeEmoteFromFavourites',
  async ({ userId, emoteId }, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/users/${userId}/favourites/emotes`, { data: { emoteId } });
      return res.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);


const favouritesSlice = createSlice({
    name: 'emoteFavourites',
    initialState: {
      favs: [],
      loading: 'idle',
      error: null
    },
    reducers: { },
    extraReducers: (builder) => {
      builder
        .addCase(addEmoteToFavourites.pending, (state) => {
          state.loading = 'loading';
        })
        .addCase(addEmoteToFavourites.fulfilled, (state, action) => {
          state.loading = 'succeeded';          
          state.favs = action.payload.payload;          
        })
        .addCase(addEmoteToFavourites.rejected, (state, action) => {
          state.loading = 'failed';
          state.error = action.payload.message;
        })
        .addCase(removeEmoteFromFavourites.pending, (state) => {
          state.loading = 'loading';
        })
        .addCase(removeEmoteFromFavourites.fulfilled, (state, action) => {          
          state.loading = 'succeeded';
          state.favs = action.payload.payload;
        })
        .addCase(removeEmoteFromFavourites.rejected, (state, action) => {
          state.loading = 'failed';
          state.error = action.payload.message;
        });
    }
  });

  export default favouritesSlice.reducer;