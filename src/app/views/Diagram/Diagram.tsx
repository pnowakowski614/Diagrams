import React, { useRef, useState } from 'react';
import styles from './diagram.module.scss';
import 'styles/rappid-overrides.scss';
import "@clientio/rappid/rappid.css";
import RappidService, { InspectorState } from 'app/services/rappidService';
import useEffectOnce from "app/helpers/useEffectOnce";
import DiagramToolbar from "./DiagramToolbar/DiagramToolbar";
import Inspector from "./Inspector/Inspector";

const Diagram = () => {
    const canvas = useRef(null);
    const stencil = useRef(null);

    const [inspectorState, setInspectorState] = useState<InspectorState>({
        isOpened: false,
        cellView: null
    });

    useEffectOnce(() => {
        if (canvas.current && stencil.current) {
            const rappidInst = new RappidService(canvas.current!, stencil.current!);
            rappidInst.init();
            rappidInst.setInspectorFunction(setInspectorState);
        }
    });

    return (
        <div className={styles.diagramContainer}>
            <DiagramToolbar/>
            <div className={styles.wrapper}>
                <div className={styles.stencilHolder} ref={stencil}/>
                <div className={styles.canvas} ref={canvas}/>
            </div>
            {inspectorState.isOpened && inspectorState.cellView &&
                <Inspector cellView={inspectorState.cellView}/>}
        </div>
    );
}

export default Diagram;
