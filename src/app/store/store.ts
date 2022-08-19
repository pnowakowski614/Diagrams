import { configureStore, createSlice } from "@reduxjs/toolkit";
import RappidService from "app/services/rappidService";

const initialState: RappidService | null = null;

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