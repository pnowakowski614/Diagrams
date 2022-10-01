import React from "react";
import styles from './inspector.module.scss';
import { dia } from "@clientio/rappid";
import { colorChangeShapes } from "../../../utils/rappid-utils";
import { GlobalShapesTypes } from "../../../types/enums";
import { MaxLinksInput } from "./MaxLinksInput";
import { LabelInput } from "./LabelInput";
import { ColorInput } from "./ColorInput";

interface InspectorProps {
    cellView: dia.CellView
    graph: dia.Graph
}

const Inspector = ({cellView, graph}: InspectorProps) => {
    const inspectedGlobalType: GlobalShapesTypes = cellView.model.prop("type");

    return (
        <div className={styles.inspector}>
            {inspectedGlobalType !== GlobalShapesTypes.CustomLink &&
                <>
                    <div className={styles.inspectorElement}>
                        <div className={styles.inspectorCategoryContainer}>
                            <h4 className={styles.inspectorCategoryHeader}>Label</h4>
                        </div>
                        <LabelInput cellView={cellView}/>
                    </div>
                    <div className={styles.inspectorElement}>
                        <div className={styles.inspectorCategoryContainer}>
                            <h4 className={styles.inspectorCategoryHeader}>Maximum outgoing links</h4>
                        </div>
                        <MaxLinksInput cellView={cellView} graph={graph}/>
                    </div>
                </>
            }
            {colorChangeShapes.includes(inspectedGlobalType) && <div className={styles.inspectorElement}>
                <div className={styles.inspectorCategoryContainer}>
                    <h4 className={styles.inspectorCategoryHeader}>Color</h4>
                </div>
                <ColorInput cellView={cellView}/>
            </div>}
        </div>
    )
}

export default Inspector;
