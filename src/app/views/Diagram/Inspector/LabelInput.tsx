import React, { ChangeEvent, useEffect, useState } from "react";
import { Input } from "@mui/material";
import { dia } from "@clientio/rappid";

export interface LabelInputProps {
    cellView: dia.CellView
}

export const LabelInput = ({cellView}: LabelInputProps) => {
    const inspectedElementText = cellView.model.attr("label/text") || "";

    const [textValue, setTextValue] = useState(inspectedElementText);

    const handleLabelChange = (event: ChangeEvent<HTMLInputElement>) => {
        cellView.model.attr({
            label: {
                text: event.target.value
            }
        });

        setTextValue(event.target.value);
    }

    useEffect(() => {
        setTextValue(inspectedElementText);
    }, [inspectedElementText])

    return (
        <Input value={textValue} onChange={handleLabelChange}/>
    )
}
