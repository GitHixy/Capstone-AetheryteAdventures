import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAchievements,
  fetchMinions,
  fetchOrchestrions,
  fetchTitles,
  fetchTriadCards,
  fetchEmotes,
  fetchMounts,
  fetchFashions
} from './ffxivCollectThunks';

const createDataSlice = (name, fetchThunk) => {
  return createSlice({
    name,
    initialState: { data: [], status: 'idle', error: null },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchThunk.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchThunk.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.data = action.payload;
        })
        .addCase(fetchThunk.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
    }
  });
};

export const achievementsSlice = createDataSlice('achievements', fetchAchievements);
export const minionsSlice = createDataSlice('minions', fetchMinions);
export const orchestrionsSlice = createDataSlice('orchestrions', fetchOrchestrions);
export const titlesSlice = createDataSlice('titles', fetchTitles);
export const triadCardsSlice = createDataSlice('triadCards', fetchTriadCards);
export const emotesSlice = createDataSlice('emotes', fetchEmotes);
export const mountsSlice = createDataSlice('mounts', fetchMounts);
export const fashionsSlice = createDataSlice('fashions', fetchFashions);
