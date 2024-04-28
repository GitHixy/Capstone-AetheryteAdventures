import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/messages`);
    return response.data;
  }
);

export const postMessage = createAsyncThunk(
  'messages/postMessage',
  async (messageData) => {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/messages`, messageData);
    return response.data;
  }
);

const messageSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(postMessage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase(postMessage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default messageSlice.reducer;
  