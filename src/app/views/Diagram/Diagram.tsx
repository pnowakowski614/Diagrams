import React, { useRef, useState } from 'react';
import styles from './diagram.module.scss';
import 'styles/rappid-overrides.scss';
import "@clientio/rappid/rappid.css";
import RappidService, { InspectorState } from 'app/services/rappidService';
import useEffectOnce from "app/helpers/useEffectOnce";
import Inspector from "./Inspector/Inspector";
import { useSelector } from "react-redux";
import { JSONGraphRootState } from "../../types/interfaces";

const Diagram = () => {
    const canvas = useRef(null);
    const stencil = useRef(null);
    const toolbar = useRef(null);

    const diagramList = useSelector((state: JSONGraphRootState) => state.diagramList)
    const diagramId = useSelector((state: JSONGraphRootState) => state.id)

    const [inspectorState, setInspectorState] = useState<InspectorState>({
        isOpened: false,
        cellView: null,
        graph: null,
    });

    useEffectOnce(() => {
        if (canvas.current && stencil.current) {
            const rappidInst = new RappidService(canvas.current!, stencil.current!, toolbar.current!);
            rappidInst.init();
            rappidInst.setInspectorFunction(setInspectorState);
            if (diagramList !== null) {
                rappidInst.getGraphFromJSON(diagramList, diagramId);
            }
        }
    });

    return (
        <div className={styles.diagramContainer}>
            <div className={styles.diagramToolbar} ref={toolbar}/>
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
