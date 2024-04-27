import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const addFashionToFavourites = createAsyncThunk(
  'favourites/addFashionToFavourites',
  async ({ userId, fashionId }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/${userId}/favourites/fashions`, { fashionId });
      console.log(res.data);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const removeFashionFromFavourites = createAsyncThunk(
  'favourites/removeFashionFromFavourites',
  async ({ userId, fashionId }, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/users/${userId}/favourites/fashions`, { data: { fashionId } });
      return res.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);


const favouritesSlice = createSlice({
    name: 'fashionFavourites',
    initialState: {
      favs: [],
      loading: 'idle',
      error: null
    },
    reducers: { },
    extraReducers: (builder) => {
      builder
        .addCase(addFashionToFavourites.pending, (state) => {
          state.loading = 'loading';
        })
        .addCase(addFashionToFavourites.fulfilled, (state, action) => {
          state.loading = 'succeeded';          
          state.favs = action.payload.payload;          
        })
        .addCase(addFashionToFavourites.rejected, (state, action) => {
          state.loading = 'failed';
          state.error = action.payload.message;
        })
        .addCase(removeFashionFromFavourites.pending, (state) => {
          state.loading = 'loading';
        })
        .addCase(removeFashionFromFavourites.fulfilled, (state, action) => {          
          state.loading = 'succeeded';
          state.favs = action.payload.payload;
        })
        .addCase(removeFashionFromFavourites.rejected, (state, action) => {
          state.loading = 'failed';
          state.error = action.payload.message;
        });
    }
  });

  export default favouritesSlice.reducer;