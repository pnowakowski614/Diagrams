import React from "react";
import styles from "./inspector.module.scss";
import { colorChangeShapes } from "../../../utils/config-utils";
import { GlobalShapesTypes } from "../../../types/enums";
import { MaxLinksInput } from "./MaxLinksInput";
import { LabelInput } from "./LabelInput";
import { ColorInput } from "./ColorInput";
import { dia } from "@clientio/rappid";

export interface InspectorProps {
  cell: dia.Cell;
  graph: dia.Graph;
}

const Inspector = ({ cell, graph }: InspectorProps) => {
  const inspectedGlobalType: GlobalShapesTypes = cell.prop("type");

  return (
    <div className={styles.inspector}>
      {inspectedGlobalType !== GlobalShapesTypes.CustomLink && (
        <>
          <div className={styles.inspectorElement}>
            <div className={styles.inspectorCategoryContainer}>
              <h4 className={styles.inspectorCategoryHeader}>Label</h4>
            </div>
            <div className={styles.labelInputWrapper}>
              <LabelInput cell={cell} />
            </div>
          </div>
          <div className={styles.inspectorElement}>
            <div className={styles.inspectorCategoryContainer}>
              <h4 className={styles.inspectorCategoryHeader}>
                Maximum outgoing links
              </h4>
            </div>
            <div className={styles.maxLinkInputWrapper}>
              <MaxLinksInput cell={cell} graph={graph} />
            </div>
          </div>
        </>
      )}
      {colorChangeShapes.includes(inspectedGlobalType) && (
        <div className={styles.inspectorElement}>
          <div className={styles.inspectorCategoryContainer}>
            <h4 className={styles.inspectorCategoryHeader}>Color</h4>
          </div>
          <div className={styles.colorInputWrapper}>
            <ColorInput cell={cell} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Inspector;
