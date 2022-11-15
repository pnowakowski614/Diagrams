import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteFromDb } from "../API/fetchMethods";

const initialState = {
    loadingDiagram: false,
}

export const deleteDiagram = createAsyncThunk(
    `diagrams/deleteDiagram`,
    async (id: string) => {
        return deleteFromDb(id);
    })

export const deleteDiagramSlice = createSlice({
    name: 'deleteDiagram',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(deleteDiagram.pending, (state) => {
            state.loadingDiagram = true
        })
        builder.addCase(deleteDiagram.fulfilled, (state) => {
            state.loadingDiagram = false
        })
        builder.addCase(deleteDiagram.rejected, (state) => {
            state.loadingDiagram = false
        })
    }
})

export const deleteDiagramReducer = deleteDiagramSlice.reducer
