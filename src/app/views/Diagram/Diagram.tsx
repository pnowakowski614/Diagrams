import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import styles from './diagram.module.scss';
import 'styles/rappid-overrides.scss';
import "@clientio/rappid/rappid.css";
import RappidService, { InspectorState } from 'app/services/rappidService';
import useEffectOnce from "app/helpers/useEffectOnce";
import Inspector from "./Inspector/Inspector";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import jwt from "jsonwebtoken";
import { addDiagram } from "../../store/addDiagramSlice";
import { AppDispatch } from "../../store/store";
import { filterDiagramInfo } from "../../utils/rappid-utils";
import { Button, TextField } from "@mui/material";
import { saveDiagramName } from "../../store/singleDiagramSlice";

const Diagram = () => {
    const history = useHistory();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const user = jwt.decode(token)
            if (!user) {
                localStorage.removeItem('token')
                history.replace('/login')
            }
        }
    }, [])

    const canvas = useRef(null);
    const stencil = useRef(null);
    const toolbar = useRef(null);

    const {currentDiagram, diagramName} = useSelector((state: any) => state.singleDiagram)

    const [inspectorState, setInspectorState] = useState<InspectorState>({
        isOpened: false,
        cellView: null,
        graph: null,
    });

    const [diagramNameState, setDiagramNameState] = useState<string>(diagramName)

    const handleDiagramNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDiagramNameState(event.target.value);
    }

    const sendDiagramNameToStore = () => {
        dispatch(saveDiagramName(diagramNameState));
    }

    useEffectOnce(() => {
        if (canvas.current && stencil.current) {
            const rappidInst = new RappidService(canvas.current!, stencil.current!, toolbar.current!);
            rappidInst.init();
            rappidInst.setInspectorFunction(setInspectorState);
            if (currentDiagram !== null) {
                rappidInst.getGraphFromDB(currentDiagram);
            } else {
                const graphInfo = filterDiagramInfo(rappidInst.graph);
                const diagram = JSON.stringify(graphInfo);
                dispatch(addDiagram({diagram, diagramNameState}));
            }
        }
    });

    return (
        <div className={styles.diagramContainer}>
            <div className={styles.toolbarWrapper}>
                <div className={styles.diagramToolbar} ref={toolbar}/>
                <Button variant="contained" size="small" onClick={sendDiagramNameToStore}
                        sx={{fontSize: 13, height: "40px", marginLeft: "18px"}}>Save</Button>
                <TextField required label="Diagram Name:" size="small" value={diagramNameState}
                           onChange={handleDiagramNameChange}/>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.stencilHolder} ref={stencil}/>
                <div className={styles.canvas} ref={canvas}/>
            </div>
            {inspectorState.isOpened && inspectorState.cellView && inspectorState.graph &&
                <Inspector cellView={inspectorState.cellView} graph={inspectorState.graph}/>}
        </div>
    );
}

export default Diagram;
