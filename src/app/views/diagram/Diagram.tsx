import React, { useRef, useState } from 'react';
import styles from './diagram.module.scss';
import "../../services/Rappid/rappid.scss"
import Rappid from '../../services/Rappid/rappid';
import useEffectOnce from "../../helpers/useEffectOnce";
import Toolbar from "./components/Toolbar/Toolbar";

const Diagram = () => {
    const canvas = useRef(null);
    const stencil = useRef(null);

    const [isInspectorDisplay, setIsInspectorDisplay] = useState(false);

    useEffectOnce(() => {
        const rappidInst = new Rappid(canvas.current!, stencil.current!);
        rappidInst.init();
    });

    return (
        <div className={styles.diagramContainer}>
            <Toolbar/>
            <div className={styles.wrapper}>
                <div className={styles.stencilHolder} ref={stencil}/>
                <div className={styles.canvas} onMouseEnter={() => setIsInspectorDisplay(true)}
                     onMouseLeave={() => setIsInspectorDisplay(false)} ref={canvas}/>
                {isInspectorDisplay && <div className={styles.inspector}>inspector</div>}
            </div>
        </div>
    );
}

export default Diagram;
