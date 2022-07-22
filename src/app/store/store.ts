import { configureStore, createSlice } from "@reduxjs/toolkit";
import Rappid from "../services/Rappid/rappid";

const initialState: Rappid | null = null;

const rappidSlice = createSlice({
    name: 'rappidInstance',
    initialState,
    reducers: {}
});

const store = configureStore({
    reducer: {rappidReducer: rappidSlice.reducer}
});

export const rappidActions = rappidSlice.actions;
export default store;