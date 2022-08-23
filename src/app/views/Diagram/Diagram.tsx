import React, { useRef, useState } from 'react';
import styles from './diagram.module.scss';
import "@clientio/rappid/rappid.css";
import RappidService from 'app/services/rappidService';
import useEffectOnce from "app/helpers/useEffectOnce";
import DiagramToolbar from "./DiagramToolbar/DiagramToolbar";

const Diagram = () => {
    const canvas = useRef(null);
    const stencil = useRef(null);

    const [inspectorOpened, setInspectorOpened] = useState<boolean>(false);

    useEffectOnce(() => {
        if (canvas.current && stencil.current) {
            const rappidInst = new RappidService(canvas.current!, stencil.current!);
            rappidInst.init();
            rappidInst.setInspectorFunction(setInspectorOpened);
        }
    });

    return (
        <div className={styles.diagramContainer}>
            <DiagramToolbar/>
            <div className={styles.wrapper}>
                <div className={styles.stencilHolder} ref={stencil}/>
                <div className={styles.canvas} ref={canvas}/>
            </div>
            {inspectorOpened && <div className={styles.inspector}>inspector</div>}
        </div>
    );
}

export default Diagram;
