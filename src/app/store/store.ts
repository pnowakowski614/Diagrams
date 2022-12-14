import { configureStore } from "@reduxjs/toolkit";
import { diagramReducer } from "./diagramsSlice";
import { usersReducer } from "./usersSlice";

const store = configureStore({
  reducer: {
    diagrams: diagramReducer,
    users: usersReducer,
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
