import React, { ChangeEvent, useEffect, useState } from "react";
import { Input } from "@mui/material";
import { dia } from "@clientio/rappid";

export interface LabelInputProps {
  cell: dia.Cell;
}

export const LabelInput = ({ cell }: LabelInputProps) => {
  const inspectedElementText = cell.attr("label/text") || "";

  const [textValue, setTextValue] = useState(inspectedElementText);

  const handleLabelChange = (event: ChangeEvent<HTMLInputElement>) => {
    cell.attr({
      label: {
        text: event.target.value,
      },
    });

    setTextValue(event.target.value);
  };

  useEffect(() => {
    setTextValue(inspectedElementText);
  }, [inspectedElementText]);

  return <Input value={textValue} onChange={handleLabelChange} />;
};
