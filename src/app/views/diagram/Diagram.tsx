import React, { useRef } from 'react';
import './diagram.scss';
import Rappid from './rappid_class';
import useEffectOnce from "../../helpers/useEffectOnce";

const Diagram = () => {
  const canvas = useRef(null);

  useEffectOnce(() => {
    if(canvas.current) {
      const rappidInst = new Rappid(canvas.current);
      rappidInst.init();
    }
  });

  return (
    <div className="canvas" ref={canvas}/>
  );
}

export default Diagram;
