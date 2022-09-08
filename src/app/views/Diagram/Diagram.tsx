import React, { useRef, useState } from 'react';
import styles from './diagram.module.scss';
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
        elementView: null
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
            <div className={styles.stencilHolder} ref={stencil}/>
            <div className={styles.wrapper}>
                <DiagramToolbar/>
                <div className={styles.canvas} ref={canvas}/>
            </div>
            {inspectorState.isOpened && inspectorState.elementView &&
                <Inspector elementView={inspectorState.elementView}/>}
        </div>
    );
}

export default Diagram;
