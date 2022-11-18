import { GlobalShapesTypes } from "../../../types/enums";
import React, { useEffect, useState } from "react";
import { MuiColorInput, MuiColorInputValue } from "mui-color-input";
import styles from "./inspector.module.scss";
import { dia } from "@clientio/rappid";

export interface ColorInputProps {
  cell: dia.Cell;
}

export const ColorInput = ({ cell }: ColorInputProps) => {
  const inspectedGlobalType: GlobalShapesTypes = cell.prop("type");

  const findInspectedColor = (inspectedGlobalType: GlobalShapesTypes) => {
    if (inspectedGlobalType === GlobalShapesTypes.CustomLink) {
      return cell.attr("line/stroke");
    } else {
      return cell.attr("background/fill");
    }
  };

  const [color, setColor] = useState(findInspectedColor(inspectedGlobalType));

  const handleColorChange = (color: MuiColorInputValue) => {
    setColor(color);

    if (inspectedGlobalType === GlobalShapesTypes.CustomLink) {
      cell.attr("line/stroke", color);
    } else {
      cell.attr({
        background: {
          fill: color.toString(),
        },
        body: {
          stroke: color.toString(),
        },
      });
    }
  };

  useEffect(() => {
    setColor(findInspectedColor(inspectedGlobalType));
  }, [findInspectedColor]);

  return (
    <MuiColorInput
      className={styles.colorInput}
      value={color}
      onChange={handleColorChange}
    />
  );
};

