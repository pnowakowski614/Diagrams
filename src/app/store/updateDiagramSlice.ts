import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateDiagramInDb } from "../API/fetchMethods";

const initialState = {
    loadingDiagram: false,
}

export const updateDiagram = createAsyncThunk(
    `diagrams/updateDiagram`,
    async (dataForUpdate: { cells: JSON, diagramName: string, id: string }) => {
        const {cells, diagramName, id} = dataForUpdate;
        return updateDiagramInDb(cells, diagramName, id);
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
