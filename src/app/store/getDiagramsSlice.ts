import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDiagramListFromDb } from "../API/fetchMethods";

const initialState = {
    diagrams: [],
    loading: false,
}

export const getDiagrams = createAsyncThunk(
    'diagrams/getDiagrams',
    async () => {
        return getDiagramListFromDb();
    })

export const diagramsSlice = createSlice({
    name: 'diagrams',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getDiagrams.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getDiagrams.fulfilled, (state, {payload}) => {
            state.loading = false
            state.diagrams = payload
        })
        builder.addCase(getDiagrams.rejected, (state) => {
            state.loading = false
        })
    }
})

export const diagramsReducer = diagramsSlice.reducer
