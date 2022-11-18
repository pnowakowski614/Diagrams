import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    deleteFromDb,
    getDiagramListFromDb,
    getSingleDiagramFromDb,
    postToDb,
    updateDiagramInDb
} from "../API/fetchMethods";

const initialState = {
    loadingList: false,
    currentDiagram: null,
    diagrams: [],
    diagramName: "Default Name",
    id: "",
    loadingDiagram: false,
}

export const addDiagram = createAsyncThunk(
    `diagrams/addDiagram`,
    async (dataToPost: { diagram: JSON, diagramNameState: string }) => {
        const {diagram, diagramNameState} = dataToPost
        return await postToDb(diagram, diagramNameState);
    })

export const deleteDiagram = createAsyncThunk(
    `diagrams/deleteDiagram`,
    async (id: string) => {
        return deleteFromDb(id);
    })

export const getSingleDiagram = createAsyncThunk(
    `diagrams/getSingleDiagram`,
    async (id: string) => {
        const diagram = await getSingleDiagramFromDb(id);
        return {diagram, id};
    })

export const getDiagrams = createAsyncThunk(
    'diagrams/getDiagrams',
    async () => {
        return getDiagramListFromDb();
    })

export const updateDiagram = createAsyncThunk(
    `diagrams/updateDiagram`,
    async (dataForUpdate: { cells: JSON, diagramName: string, id: string }) => {
        const {cells, diagramName, id} = dataForUpdate;
        return updateDiagramInDb(cells, diagramName, id);
    })

export const diagramSlice = createSlice({
    name: 'addDiagram',
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
        builder.addCase(addDiagram.fulfilled, (state, {payload}) => {
            state.id = payload._id
            state.currentDiagram = payload.cells
        })
        builder.addCase(deleteDiagram.fulfilled, () => {
        })
        builder.addCase(getDiagrams.pending, (state) => {
            state.loadingList = true
        })
        builder.addCase(getDiagrams.fulfilled, (state, {payload}) => {
            state.loadingList = false
            state.diagrams = payload
        })
        builder.addCase(updateDiagram.fulfilled, () => {
        })
        builder.addCase(getSingleDiagram.pending, (state) => {
            state.loadingDiagram = true
        })
        builder.addCase(getSingleDiagram.fulfilled, (state, {payload}) => {
            state.loadingDiagram = false
            state.currentDiagram = payload.diagram.cells
            state.id = payload.id
        })

    }
})

export const {saveDiagramName, clearCurrentDiagram} = diagramSlice.actions
export const diagramReducer = diagramSlice.reducer


