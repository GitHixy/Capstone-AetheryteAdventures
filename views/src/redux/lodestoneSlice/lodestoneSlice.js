import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchNews = createAsyncThunk(
    '/fetchNews',
    async(_, {rejectWithValue}) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/news`);
            return res.data;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);



const lodestoneSlice = createSlice({
    name: 'lodestone',
    initialState: {
        news: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchNews.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchNews.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.news = action.payload;
        })
        .addCase(fetchNews.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        })
    }
})

export default lodestoneSlice.reducer;