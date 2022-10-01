import { dia } from "@clientio/rappid";
import React, { ChangeEvent, useEffect, useState } from "react";
import { getShapeLabelWidth } from "../../../utils/rappid-utils";
import { Input } from "@mui/material";
import styles from "./inspector.module.scss";

interface LabelInputProps {
    cellView: dia.CellView
}

export const LabelInput = ({cellView}: LabelInputProps) => {
    const inspectedElementText = cellView.model.attr("label/text") || "";

    const [textValue, setTextValue] = useState(inspectedElementText);

    const handleLabelChange = (event: ChangeEvent<HTMLInputElement>) => {
        cellView.model.attr("label/textWrap", {
            width: getShapeLabelWidth(cellView),
            height: 20,
            ellipsis: true
        })

        setTextValue(event.target.value);
        cellView.model.attr("label/text", event.target.value);
    }

    useEffect(() => {
        setTextValue(inspectedElementText);
    }, [inspectedElementText])

    return (
        <Input className={styles.input} value={textValue} onChange={handleLabelChange}/>
    )
}
