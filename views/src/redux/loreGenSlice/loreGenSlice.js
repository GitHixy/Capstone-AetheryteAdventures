import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const generateLore = createAsyncThunk(
    'lore/generateLore',
    async({name, race, charClass, gender}, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/generateLore`, {
                name, race, charClass, gender
            });

            return response.data.lore;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

const loreSlice = createSlice({
    name: 'lore',
    initialState: {
        lore: '',
        status: 'idle',
        error: null,
    },
    reducers: {resetLore: (state) => {
        state.lore = '';
        state.status = 'idle';
        state.error = null;
      }
    },
    extraReducers: (builder) => {
        builder
        .addCase(generateLore.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(generateLore.fulfilled, (state, action) => {
            state.lore = action.payload;
            state.status = 'succeeded';
          })
          .addCase(generateLore.rejected, (state, action) => {
            state.error = action.payload;
            state.status = 'failed';
          });
      }
    });
    
    export const { resetLore } = loreSlice.actions;
    export default loreSlice.reducer;
    
