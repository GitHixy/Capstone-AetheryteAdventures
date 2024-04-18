import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk(
    '/login',
    async (userData, {rejectWithValue}) => {
        try {
            console.log(`Making API call to: ${process.env.REACT_APP_BASE_URL}/login`);
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/login`, userData);
            return res.data;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);



const loginSlice = createSlice({
    name: 'login',
    initialState:  {
        user: localStorage.getItem('username') || null,
        token: localStorage.getItem('auth') || null,
        status: 'idle',
        error: null
    },
    reducers: {
        resetLoginState: (state) => {
            state.user = null;
            state.token = null;
            state.status = 'idle';
            state.error = null;
        },
        logout: (state) => {
            console.log("Logging out, clearing state and local storage");
            localStorage.removeItem('auth');
            localStorage.removeItem('username');
            state.user = null;
            state.token = null;
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.token = action.payload.token;
            state.user = {email: action.payload.email, username: action.payload.username};
            localStorage.setItem('auth', action.payload.token);
            localStorage.setItem('username', action.payload.username);
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload.message || 'Failed to login';
        });
    }
});

export const {resetLoginState, logout} = loginSlice.actions;
export default loginSlice.reducer;