import { GlobalShapesTypes } from "../../../types/enums";
import React, { useEffect, useState } from "react";
import { MuiColorInput, MuiColorInputValue } from "mui-color-input";
import { dia } from "@clientio/rappid";

interface ColorInputProps {
    cellView: dia.CellView
}

export const ColorInput = ({cellView}: ColorInputProps) => {
    const inspectedGlobalType: GlobalShapesTypes = cellView.model.prop("type");

    const findInspectedColor = (inspectedGlobalType: GlobalShapesTypes) => {
        if (inspectedGlobalType === GlobalShapesTypes.CustomLink) {
            return cellView.model.attr("line/stroke");
        } else {
            return cellView.model.attr("background/fill");
        }
    };

    const [color, setColor] = useState(findInspectedColor(inspectedGlobalType));

    const handleColorChange = (color: MuiColorInputValue) => {
        setColor(color);

        if (inspectedGlobalType === GlobalShapesTypes.CustomLink) {
            cellView.model.attr("line/stroke", color);
        } else {
            cellView.model.attr("background/fill", color);
            cellView.model.attr("body/stroke", color);
        }
    }

    useEffect(() => {
        setColor(findInspectedColor(inspectedGlobalType));
    }, [findInspectedColor])

    return (<MuiColorInput value={color} onChange={handleColorChange}/>)
}

