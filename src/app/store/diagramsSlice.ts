import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteFromDb,
  getDiagramListFromDb,
  getSingleDiagramFromDb,
  postToDb,
  updateDiagramInDb,
} from "../API/fetchMethods";
import { DbCellAttrs } from "../types/types";

interface DiagramSliceType {
  loadingList: boolean;
  currentDiagram: [DbCellAttrs] | null;
  diagrams: { _id: string; diagramName: string }[];
  diagramName: string;
  diagramId: string;
  loadingDiagram: boolean;
  isDiagramSaved: boolean;
  isDiagramFetched: boolean;
}

const initialState = {
  loadingList: false,
  currentDiagram: null,
  diagrams: [],
  diagramName: "Default Name",
  diagramId: localStorage.getItem("id"),
  loadingDiagram: false,
  isDiagramSaved: false,
  isDiagramFetched: false,
} as DiagramSliceType;

export const addDiagram = createAsyncThunk(
  `diagrams/addDiagram`,
  async (dataToPost: { diagram: DbCellAttrs[]; diagramNameState: string }) => {
    const { diagram, diagramNameState } = dataToPost;
    return await postToDb(diagram, diagramNameState);
  }
);

export const deleteDiagram = createAsyncThunk(
  `diagrams/deleteDiagram`,
  async (id: string) => {
    return deleteFromDb(id);
  }
);

export const getSingleDiagram = createAsyncThunk(
  `diagrams/getSingleDiagram`,
  async (id: string) => {
    const diagram = await getSingleDiagramFromDb(id);
    return { diagram, id };
  }
);

export const getDiagrams = createAsyncThunk(
  "diagrams/getDiagrams",
  async () => {
    return getDiagramListFromDb();
  }
);

export const updateDiagram = createAsyncThunk(
  `diagrams/updateDiagram`,
  async (dataForUpdate: {
    cells: DbCellAttrs[];
    diagramName: string;
    id: string;
  }) => {
    const { cells, diagramName, id } = dataForUpdate;
    return updateDiagramInDb(cells, diagramName, id);
  }
);

export const diagramSlice = createSlice({
  name: "addDiagram",
  initialState,
  reducers: {
    clearCurrentDiagram: (state) => {
      state.currentDiagram = null;
    },
    clearDiagramName: (state) => {
      state.diagramName = "Default Name";
    },
    clearCurrentId: (state) => {
      localStorage.removeItem("id");
      state.diagramId = "";
    },
    saveDiagramName: (state, { payload }) => {
      state.diagramName = payload;
    },
    changeIsDiagramSaved: (state) => {
      state.isDiagramSaved
        ? (state.isDiagramSaved = false)
        : (state.isDiagramSaved = true);
    },
    clearIsDiagramFetched: (state) => {
      state.isDiagramFetched = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addDiagram.fulfilled, (state, { payload }) => {
      state.diagramId = payload._id;
      state.currentDiagram = payload.cells;
    });
    builder.addCase(getDiagrams.pending, (state) => {
      state.loadingList = true;
    });
    builder.addCase(getDiagrams.fulfilled, (state, { payload }) => {
      state.loadingList = false;
      state.diagrams = payload;
    });
    builder.addCase(getSingleDiagram.pending, (state) => {
      state.loadingDiagram = true;
    });
    builder.addCase(getSingleDiagram.fulfilled, (state, { payload }) => {
      state.loadingDiagram = false;
      state.currentDiagram = payload.diagram.cells;
      state.diagramId = payload.id;
      state.diagramName = payload.diagram.diagramName;
      state.isDiagramFetched = true;
    });
  },
});

export const {
  clearIsDiagramFetched,
  changeIsDiagramSaved,
  saveDiagramName,
  clearCurrentDiagram,
  clearCurrentId,
  clearDiagramName,
} = diagramSlice.actions;
export const diagramReducer = diagramSlice.reducer;
