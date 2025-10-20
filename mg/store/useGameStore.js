"use client";
import { configureStore } from "@reduxjs/toolkit";
import gamesSlice from "./Gameslice";

export const store = configureStore({
  reducer: {
    games: gamesSlice,
  },
});
