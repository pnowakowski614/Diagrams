import { configureStore } from "@reduxjs/toolkit";
import { diagramsReducer } from "./getDiagramsSlice";
import { singleDiagramReducer } from "./singleDiagramSlice";
import { addDiagramReducer } from "./addDiagramSlice";
import { deleteDiagramReducer } from "./deleteDiagramSlice";
import { updateDiagramReducer } from "./updateDiagramSlice";

const store = configureStore({
    reducer: {
        diagrams: diagramsReducer,
        singleDiagram: singleDiagramReducer,
        addDiagram: addDiagramReducer,
        deleteDiagram: deleteDiagramReducer,
        updateDiagram: updateDiagramReducer
    }
});

export default store;
export type AppDispatch = typeof store.dispatch
