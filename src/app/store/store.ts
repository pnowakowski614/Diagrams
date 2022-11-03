import { configureStore, createSlice } from "@reduxjs/toolkit";

export const initialJsonGraph = {
    diagramList: null,
    currentDiagramId: null
};

const jsonGraphSlice = createSlice({
    name: 'jsonObject',
    initialState: initialJsonGraph,
    reducers: {
        clearCurrentDiagram(state) {
            state.diagramList = null;
            state.currentDiagramId = null;
        },
        addObject(state, action) {
            const {object, _id} = action.payload;
            state.diagramList = object;
            state.currentDiagramId = _id;
        }
    }
});

const store = configureStore({
    reducer: jsonGraphSlice.reducer
});

export const jsonGraphSliceActions = jsonGraphSlice.actions;
export default store;
