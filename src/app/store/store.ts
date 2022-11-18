import { configureStore } from "@reduxjs/toolkit";
import { diagramReducer } from "./diagramsSlice";

const store = configureStore({
    reducer: {
        // diagrams: diagramsReducer,
        // singleDiagram: singleDiagramReducer,
        // addDiagram: addDiagramReducer,
        // deleteDiagram: deleteDiagramReducer,
        // updateDiagram: updateDiagramReducer
        diagrams: diagramReducer
    }
});

export default store;
export type AppDispatch = typeof store.dispatch
