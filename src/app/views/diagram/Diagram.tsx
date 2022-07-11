import React, { useRef, useState } from 'react';
import styles from './diagram.module.scss';
import "./rappid.scss"
import Rappid from './rappid';
import useEffectOnce from "../../helpers/useEffectOnce";

const Diagram = () => {
    const canvas = useRef(null);
    const stencil = useRef(null);

    const [isInspectorDisp, setInspectorDisp] = useState(false);

    useEffectOnce(() => {
        const rappidInst = new Rappid(canvas.current!, stencil.current!);
        rappidInst.init();
    });

    return (
        <div className={styles.wrapper}>
            <div className={styles.stencilHolder} ref={stencil}/>
            <div className={styles.canvas} onMouseEnter={() => setInspectorDisp(true)}
                 onMouseLeave={() => setInspectorDisp(false)} ref={canvas}>
                {isInspectorDisp && <div className={styles.inspector}>inspector</div>}
            </div>
        </div>
    );
}

export default Diagram;
