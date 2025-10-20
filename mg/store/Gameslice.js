"use client";

import { getCachedQuestions } from "../lib/questionCache";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchGameQuestions = createAsyncThunk(
  "games/fetchGameQuestions",
  async ({ categories, difficulty, amount = 11 }) => {
    const results = [];
    const errors = [];

    for (const categoryId of categories) {
      try {
        let questions = await getCachedQuestions(categoryId, difficulty, amount);

        if (questions.length > 0) {
          const categoryName = questions[0]?.category || "Unknown";
          questions = questions.map(q => ({ ...q, categoryName }));
          results.push(...questions);
        }
      } catch (error) {
        errors.push({ categoryId, error: error.message });
        console.error(`Failed to fetch questions for category ${categoryId}:`, error);
      }
    }

    if (results.length === 0 && errors.length > 0) {
      throw new Error("Failed to fetch questions. Please try again later.");
    }

    return results;
  }
);

export const fetchMathQuestions = createAsyncThunk(
  "games/fetchMathQuestions",
  async (count = 11) => {
    const res = await fetch(`/api/math-questions?count=${count}`);
    if (!res.ok) throw new Error(`Failed to fetch math questions: ${res.status}`);
    const data = await res.json();
    return data.results;
  }
);

const initialState = {
  games: [],
  loading: false,
  error: null,
};

const gameSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    resetGames: (state) => {
      state.games = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGameQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGameQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.games = action.payload;
      })
      .addCase(fetchGameQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchMathQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMathQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.games = action.payload;
      })
      .addCase(fetchMathQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetGames } = gameSlice.actions;
export default gameSlice.reducer;
