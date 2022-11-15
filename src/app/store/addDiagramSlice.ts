import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postToDb } from "../API/fetchMethods";

const initialState = {
    loadingDiagram: false,
}

export const addDiagram = createAsyncThunk(
    `diagrams/addDiagram`,
    async (diagram: string) => {
        return await postToDb(diagram);
    })

export const addDiagramSlice = createSlice({
    name: 'addDiagram',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(addDiagram.pending, (state) => {
            state.loadingDiagram = true
        })
        builder.addCase(addDiagram.fulfilled, (state) => {
            state.loadingDiagram = false
        })
        builder.addCase(addDiagram.rejected, (state) => {
            state.loadingDiagram = false
        })
    }
})

export const addDiagramReducer = addDiagramSlice.reducer
