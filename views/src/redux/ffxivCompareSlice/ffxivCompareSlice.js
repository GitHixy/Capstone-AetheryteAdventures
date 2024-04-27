import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCollectibleById = createAsyncThunk(
  'collectibles/fetchById',
  async ({ section, id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://ffxivcollect.com/api/${section}?id_eq=${id}`);
      if (response.data.results && response.data.results.length > 0) {
        return { data: response.data.results[0], section, id };
      }
      return rejectWithValue('No data found for the given ID');
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const initialState = {
  data: {
    achievements: {},
    mounts: {},
    titles: {},
    minions: {},
    emotes: {},
    fashions: {},
    orchestrions: {},

},
  status: 'idle', 
  error: null
};

const collectiblesSlice = createSlice({
  name: 'collectibles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchCollectibleById.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchCollectibleById.fulfilled, (state, action) => {
      const { section, id, data } = action.payload;
      state.data[section] = state.data[section] || {}; 
      state.data[section][id] = data;                 
      state.status = 'succeeded';
    })
    .addCase(fetchCollectibleById.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  }
});

export default collectiblesSlice.reducer;

