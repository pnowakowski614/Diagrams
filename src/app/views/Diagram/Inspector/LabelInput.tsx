import React, {
  ChangeEvent,
  KeyboardEventHandler,
  useEffect,
  useState,
} from "react";
import { Input } from "@mui/material";
import { dia } from "@clientio/rappid";

export interface LabelInputProps {
  cell: dia.Cell;
}

export const LabelInput = ({cell}: LabelInputProps) => {
  const inspectedElementText = cell.attr("label/text") || "";

  const [textValue, setTextValue] = useState(inspectedElementText);

  const handleLabelChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTextValue(event.target.value);
  };

  const changeShapeName = () => {
    cell.attr({
      label: {
        text: textValue,
      },
    });
  }

  const keyPress: KeyboardEventHandler = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      changeShapeName();
    }
  };

  useEffect(() => {
    setTextValue(inspectedElementText);
  }, [inspectedElementText]);

  return <Input value={textValue}
                onKeyDown={(e: React.KeyboardEvent) => keyPress(e)}
                onBlur={changeShapeName}
                onChange={handleLabelChange}
  />;
};
