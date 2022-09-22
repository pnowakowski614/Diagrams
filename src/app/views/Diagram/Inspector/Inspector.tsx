import React, { ChangeEvent, useEffect, useState } from "react";
import styles from './inspector.module.scss';
import { Input } from "@mui/material";
import { dia } from "@clientio/rappid";
import { colorChangeShapes, getShapeLabelWidth } from "../../../utils/rappid-utils";
import { MuiColorInput } from "mui-color-input";
import { GlobalShapesTypes } from "../../../types/enums";


interface InspectorProps {
    cellView: dia.CellView
}

const Inspector = ({cellView}: InspectorProps) => {
    const inspectedElementText = cellView.model.attr("label/text") || "";
    const inspectedGlobalType: GlobalShapesTypes = cellView.model.prop("type");

    const [textValue, setTextValue] = useState(inspectedElementText);

    const findInspectedColor = (inspectedGlobalType: GlobalShapesTypes) => {
        if (inspectedGlobalType === GlobalShapesTypes.CustomLink) {
            return cellView.model.attr("line/stroke");
        } else {
            return cellView.model.attr("background/fill");
        }
    };

    const [color, setColor] = useState(findInspectedColor(inspectedGlobalType));

    const handleLabelChange = (event: ChangeEvent<HTMLInputElement>) => {
        cellView.model.attr("label/textWrap", {
            width: getShapeLabelWidth(cellView),
            height: 20,
            ellipsis: true
        })

        setTextValue(event.target.value);
        cellView.model.attr("label/text", event.target.value);
    }

    const handleColorChange = (color: any) => {
        setColor(color);

        if (inspectedGlobalType === GlobalShapesTypes.CustomLink) {
            cellView.model.attr("line/stroke", color);
        } else {
            cellView.model.attr("background/fill", color);
            cellView.model.attr("body/stroke", color);
        }
    }

    useEffect(() => {
        setTextValue(inspectedElementText);
    }, [inspectedElementText])

    useEffect(() => {
        setColor(findInspectedColor(inspectedGlobalType));
    }, [findInspectedColor])

    return (
        <div className={styles.inspector}>
            {inspectedGlobalType !== GlobalShapesTypes.CustomLink &&
                <>
                    <div className={styles.inspectorElement}>
                        <div className={styles.inspectorCategoryContainer}>
                            <h4 className={styles.inspectorCategoryHeader}>Label</h4>
                        </div>
                        <Input className={styles.input} value={textValue}
                               onChange={handleLabelChange}/>
                    </div>
                    <div className={styles.inspectorElement}>
                        <div className={styles.inspectorCategoryContainer}>
                            <h4 className={styles.inspectorCategoryHeader}>Maximum outgoing links</h4>
                        </div>
                        <Input className={styles.input} value={textValue}/>
                    </div>
                </>
            }
            {colorChangeShapes.includes(inspectedGlobalType) && <div className={styles.inspectorElement}>
                <div className={styles.inspectorCategoryContainer}>
                    <h4 className={styles.inspectorCategoryHeader}>Color</h4>
                </div>
                <MuiColorInput value={color} onChange={handleColorChange}/>
            </div>}
        </div>
    )
}

export default Inspector;
