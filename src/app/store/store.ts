import { configureStore, createSlice } from "@reduxjs/toolkit";

export const initialJsonGraph = {
    diagramList: null,
    id: null
};

const jsonGraphSlice = createSlice({
    name: 'jsonObject',
    initialState: initialJsonGraph,
    reducers: {
        clearCurrentDiagram(state) {
            state.diagramList = null;
            state.id = null;
        },
        addObject(state, action) {
            const {object, id} = action.payload;
            state.diagramList = object;
            state.id = id;
        }
    }
});

const store = configureStore({
    reducer: jsonGraphSlice.reducer
});

export const jsonGraphSliceActions = jsonGraphSlice.actions;
export default store;
