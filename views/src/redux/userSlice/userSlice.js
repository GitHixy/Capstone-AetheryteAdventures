import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const createUser = createAsyncThunk(
    '/createUser',
    async (userData, {rejectWithValue}) => {
        try {
            const formData = new FormData();
            formData.append('username', userData.username);
            formData.append('email', userData.email);
            formData.append('password', userData.password);
            formData.append('avatar', userData.avatar);

            console.log(`Making API call to: ${process.env.REACT_APP_BASE_URL}/createUser`);
            
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/createUser`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return res.data;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

const initialState = {
    user: null,
    status: 'idle',
    error: null
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        resetUserState: () => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(createUser.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })
        .addCase(createUser.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.user = action.payload;
            state.error = null;
        })
        .addCase(createUser.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload.message || 'Failed to create user';
        });
    }
})

export const { resetUserState } = userSlice.actions;
export default userSlice.reducer;