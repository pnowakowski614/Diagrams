import React, {
  ChangeEvent,
  KeyboardEventHandler,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./diagram.module.scss";
import "styles/rappid-overrides.scss";
import "@clientio/rappid/rappid.css";
import RappidService, { InspectorState } from "app/services/rappidService";
import useEffectOnce from "app/helpers/useEffectOnce";
import Inspector from "./Inspector/Inspector";
import { useDispatch, useSelector } from "react-redux";
import {
  addDiagram,
  changeIsDiagramSaved,
  clearIsDiagramFetched,
  getSingleDiagram,
  saveDiagramName,
} from "../../store/diagramsSlice";
import { AppDispatch, RootState } from "../../store/store";
import { filterDiagramInfo, getGraphFromDB } from "../../utils/parser-utils";
import { SnackbarCloseReason, TextField } from "@mui/material";
import { CustomSnackbar } from "../../components/CustomSnackbar/CustomSnackbar";
import { AlertMessages } from "../../types/enums";

const Diagram = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    currentDiagram,
    diagramName,
    isDiagramSaved,
    isDiagramFetched,
    diagramId,
  } = useSelector((state: RootState) => state.diagrams);
  const canvas = useRef(null);
  const stencil = useRef(null);
  const toolbar = useRef(null);

  const [inspectorState, setInspectorState] = useState<InspectorState>({
    cellView: null,
    graph: null,
  });

  const [diagramNameState, setDiagramNameState] = useState<string>(diagramName);
  const [rappidInstance, setRappidInstance] = useState<RappidService | null>(
    null
  );

  useEffectOnce(() => {
    if (canvas.current && stencil.current) {
      const rappidInst = new RappidService(
        canvas.current!,
        stencil.current!,
        toolbar.current!
      );
      rappidInst.init();
      rappidInst.setInspectorFunction(setInspectorState);
      setRappidInstance(rappidInst);
      if (!diagramId || diagramId === "") {
        const diagram = filterDiagramInfo(rappidInst.graph);
        dispatch(addDiagram({ diagram, diagramNameState }));
      } else {
        if (currentDiagram !== null) {
          getGraphFromDB(rappidInst.graph);
        } else {
          dispatch(getSingleDiagram(diagramId));
        }
      }
    }
  });

  useEffect(() => {
    if (isDiagramFetched && rappidInstance) {
      dispatch(clearIsDiagramFetched());
      getGraphFromDB(rappidInstance!.graph);
    }
  }, [isDiagramFetched]);

  useEffect(() => {
    localStorage.setItem("id", diagramId!);
  }, [diagramId]);

  useEffect(() => {
    setDiagramNameState(diagramName);
  }, [diagramName]);

  useEffect(() => {}, []);
  const handleDiagramNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDiagramNameState(event.target.value);
  };

  const keyPress: KeyboardEventHandler = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      dispatch(saveDiagramName(diagramNameState || "Default Name"));
    }
  };

  const handleClickAway = () => {
    dispatch(saveDiagramName(diagramNameState || "Default Name"));
  };

  const handleClose = (
    event: Event | SyntheticEvent,
    reason: SnackbarCloseReason
  ) => {
    if (reason === "clickaway" || "timeout") {
      dispatch(changeIsDiagramSaved());
      return;
    }
  };

  return (
    <>
      <CustomSnackbar
        message={AlertMessages.diagramSaved}
        open={isDiagramSaved}
        severity="success"
        onClose={handleClose}
      />
      <div className={styles.diagramContainer}>
        <div className={styles.toolbarWrapper}>
          <div className={styles.diagramToolbar} ref={toolbar} />
          <TextField
            variant="standard"
            size="small"
            value={diagramNameState}
            onBlur={handleClickAway}
            placeholder="Default Name"
            onKeyDown={(e: React.KeyboardEvent) => keyPress(e)}
            onChange={handleDiagramNameChange}
            sx={{ paddingTop: "5px" }}
          />
        </div>
        <div className={styles.wrapper}>
          <div className={styles.stencilHolder} ref={stencil} />
          <div className={styles.canvas} ref={canvas} />
        </div>
        {inspectorState.cellView && inspectorState.graph && (
          <Inspector
            cellView={inspectorState.cellView}
            graph={inspectorState.graph}
          />
        )}
      </div>
    </>
  );
};

export default Diagram;
