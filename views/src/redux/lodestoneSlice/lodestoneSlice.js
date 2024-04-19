import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchNews = createAsyncThunk(
    '/fetchNews',
    async(_, {rejectWithValue}) => {
        const config = {
            method: 'get',            
            maxBodyLength: Infinity,
            url: process.env.REACT_APP_LODESTONE_NEWS,
            headers: {}
        };
        try {
            const res = await axios(config);
            return JSON.stringify(res.data);
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