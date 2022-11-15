import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSingleDiagramFromDb } from "../API/fetchMethods";

const initialState = {
    currentDiagram: null,
    loadingDiagram: false,
}

export const getSingleDiagram = createAsyncThunk(
    `diagrams/getSingleDiagram`,
    async (id: string) => {
        return getSingleDiagramFromDb(id);
    })

export const singleDiagramSlice = createSlice({
    name: 'singleDiagram',
    initialState,
    reducers: {
        setSingleDiagram: (state, action) => {
            state.currentDiagram = action.payload;
        },
        clearCurrentDiagram: (state) => {
            state.currentDiagram = null;
        }
    },
    extraReducers: builder => {
        builder.addCase(getSingleDiagram.pending, (state) => {
            state.loadingDiagram = true
        })
        builder.addCase(getSingleDiagram.fulfilled, (state, {payload}) => {
            state.loadingDiagram = false
            state.currentDiagram = payload
        })
        builder.addCase(getSingleDiagram.rejected, (state) => {
            state.loadingDiagram = false
        })
    }
})

export const {setSingleDiagram, clearCurrentDiagram} = singleDiagramSlice.actions
export const singleDiagramReducer = singleDiagramSlice.reducer
