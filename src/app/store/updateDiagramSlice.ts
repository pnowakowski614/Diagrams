import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateDiagramInDb } from "../API/fetchMethods";

const initialState = {
    loadingDiagram: false,
}

export const updateDiagram = createAsyncThunk(
    `diagrams/updateDiagram`,
    async (dataForUpdate: { jsonString: string, id: string }) => {
        const {jsonString, id} = dataForUpdate;
        return updateDiagramInDb(jsonString, id);
    })

export const updateDiagramSlice = createSlice({
    name: 'updateDiagram',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(updateDiagram.pending, (state) => {
            state.loadingDiagram = true
        })
        builder.addCase(updateDiagram.fulfilled, (state) => {
            state.loadingDiagram = false
        })
        builder.addCase(updateDiagram.rejected, (state) => {
            state.loadingDiagram = false
        })
    }
})

export const updateDiagramReducer = updateDiagramSlice.reducer