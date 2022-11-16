import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSingleDiagramFromDb } from "../API/fetchMethods";
import { addDiagram } from "./addDiagramSlice";

const initialState = {
    currentDiagram: null,
    diagramName: "Default Name",
    id: "",
    loadingDiagram: false,
}

export const getSingleDiagram = createAsyncThunk(
    `diagrams/getSingleDiagram`,
    async (id: string) => {
        const diagram = await getSingleDiagramFromDb(id);
        return {diagram, id};
    })

export const singleDiagramSlice = createSlice({
    name: 'singleDiagram',
    initialState,
    reducers: {
        clearCurrentDiagram: (state) => {
            state.currentDiagram = null;
            state.id = "";
            state.diagramName = "Default Name";
        },
        saveDiagramName: (state, {payload}) => {
            state.diagramName = payload
        }
    },
    extraReducers: builder => {
        builder.addCase(getSingleDiagram.pending, (state) => {
            state.loadingDiagram = true
        })
        builder.addCase(getSingleDiagram.fulfilled, (state, {payload}) => {
            state.loadingDiagram = false
            state.currentDiagram = payload.diagram.cells
            state.id = payload.id
        })
        builder.addCase(getSingleDiagram.rejected, (state) => {
            state.loadingDiagram = false
        })
        builder.addCase(addDiagram.fulfilled, (state, {payload}) => {
            state.id = payload._id
            state.currentDiagram = payload.cells
        })
    }
})

export const {saveDiagramName, clearCurrentDiagram} = singleDiagramSlice.actions
export const singleDiagramReducer = singleDiagramSlice.reducer
