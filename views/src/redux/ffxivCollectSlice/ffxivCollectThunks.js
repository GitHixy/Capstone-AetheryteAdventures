import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAchievements = createAsyncThunk('achievements/fetchAchievements', async () => {
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/achievements`);
  return response.data;
});

export const fetchMinions = createAsyncThunk('minions/fetchMinions', async () => {
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/minions`);
  return response.data;
});

export const fetchOrchestrions = createAsyncThunk('orchestrions/fetchOrchestrions', async () => {
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/orchestrions`);
  return response.data;
});

export const fetchTitles = createAsyncThunk('titles/fetchTitles', async () => {
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/titles`);
  return response.data;
});

export const fetchTriadCards = createAsyncThunk('triadCards/fetchTriadCards', async () => {
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/triad/cards`);
  return response.data;
});

export const fetchEmotes = createAsyncThunk('emotes/fetchEmotes', async () => {
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/emotes`);
  return response.data;
});

export const fetchMounts = createAsyncThunk('mounts/fetchMounts', async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/mounts`);
    return response.data;
  });

  export const fetchFashions = createAsyncThunk('fashions/fetchFashions', async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/fashions`);
    return response.data;
  });
