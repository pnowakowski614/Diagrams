import React from "react";
import styles from './inspector.module.scss';
import { colorChangeShapes } from "../../../utils/rappid-utils";
import { GlobalShapesTypes } from "../../../types/enums";
import { MaxLinksInput } from "./MaxLinksInput";
import { LabelInput } from "./LabelInput";
import { ColorInput } from "./ColorInput";
import { InspectorProps } from "../../../types/interfaces";

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
                        <div className={styles.labelInputWrapper}>
                            <LabelInput cellView={cellView}/>
                        </div>
                    </div>
                    <div className={styles.inspectorElement}>
                        <div className={styles.inspectorCategoryContainer}>
                            <h4 className={styles.inspectorCategoryHeader}>Maximum outgoing links</h4>
                        </div>
                        <div className={styles.maxLinkInputWrapper}>
                            <MaxLinksInput cell={cellView.model} graph={graph}/>
                        </div>
                    </div>
                </>
            }
            {colorChangeShapes.includes(inspectedGlobalType) && <div className={styles.inspectorElement}>
                <div className={styles.inspectorCategoryContainer}>
                    <h4 className={styles.inspectorCategoryHeader}>Color</h4>
                </div>
                <div className={styles.colorInputWrapper}>
                    <ColorInput cell={cellView.model}/>
                </div>
            </div>}
        </div>
    )
}

export default Inspector;
