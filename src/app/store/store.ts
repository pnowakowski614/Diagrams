import { configureStore } from "@reduxjs/toolkit";
import { diagramsReducer } from "./getDiagramsSlice";
import { singleDiagramReducer } from "./singleDiagramSlice";
import { addDiagramReducer } from "./addDiagramSlice";

const store = configureStore({
    reducer: {
        diagrams: diagramsReducer,
        singleDiagram: singleDiagramReducer,
        addDiagram: addDiagramReducer
    }
});

export default store;
export type AppDispatch = typeof store.dispatch
