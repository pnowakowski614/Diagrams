import React, { useRef } from 'react';
import styles from './diagram.module.scss';
import "./rappid-styles.scss"
import Rappid from './rappid_class';
import useEffectOnce from "../../helpers/useEffectOnce";

const Diagram = () => {
    const canvas = useRef(null);
    const stencil = useRef(null);
    useEffectOnce(() => {
        const rappidInst = new Rappid(canvas.current!, stencil.current!);
        rappidInst.init();
    });

    return (
        <div className={styles.wrapper}>
            <div className={styles.stencilHolder} ref={stencil}/>
            <div className={styles.canvas} ref={canvas}/>
        </div>
    );
}

export default Diagram;
