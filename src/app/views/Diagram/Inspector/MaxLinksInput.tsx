import { TextField } from "@mui/material";
import styles from "./inspector.module.scss";
import React, { ChangeEvent, useEffect, useState } from "react";
import { dia } from "@clientio/rappid";

interface MaxLinksInputProps {
  cell: dia.Cell;
  graph: dia.Graph;
}

export const MaxLinksInput = ({ cell, graph }: MaxLinksInputProps) => {
  let currentLinksNumber = graph.getConnectedLinks(cell, {
    outbound: true,
  }).length;

  const currentMaxLinks = () => {
    let newMaxLinksValue = 3;
    const maxLinksValue = cell.prop("maxLinks");
    if (maxLinksValue < currentLinksNumber) {
      newMaxLinksValue = currentLinksNumber;
    } else {
      newMaxLinksValue = maxLinksValue;
    }
    if (maxLinksValue === undefined) {
      newMaxLinksValue = 3;
    }
    cell.prop("maxLinks", newMaxLinksValue);
    return newMaxLinksValue;
  };

  const [linksNumber, setLinksNumber] = useState(currentLinksNumber);
  const [maxNumberLinks, setMaxNumberLinks] = useState(currentMaxLinks);

  const handleMaxLinkChange = (event: ChangeEvent<HTMLInputElement>) => {
    const intInputValue = parseInt(event.target.value);

    setLinksNumber(currentLinksNumber);
    setMaxNumberLinks(intInputValue);

    cell.prop("maxLinks", intInputValue);
  };

  useEffect(() => {
    setLinksNumber(currentLinksNumber);
  }, [currentLinksNumber]);

  useEffect(() => {
    setMaxNumberLinks(currentMaxLinks);
  }, [currentMaxLinks]);

  return (
    <TextField
      type={"number"}
      value={maxNumberLinks}
      InputProps={{
        inputProps: { inputclassname: styles.input, min: linksNumber },
      }}
      onChange={handleMaxLinkChange}
    />
  );
};
