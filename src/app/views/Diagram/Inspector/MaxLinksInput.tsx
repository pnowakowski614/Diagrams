import { TextField } from "@mui/material";
import styles from "./inspector.module.scss";
import React, { ChangeEvent, useEffect, useState } from "react";
import { MaxLinksInputProps } from "../../../utils/types";

export const MaxLinksInput = ({cell, graph}: MaxLinksInputProps) => {
    const currentLinksNumber = graph.getConnectedLinks(cell, {outbound: true}).length;
    const currentMaxLinks = cell.prop("maxLinks") || currentLinksNumber;
    const [linksNumber, setLinksNumber] = useState(currentLinksNumber);
    const [maxNumberLinks, setMaxNumberLinks] = useState(currentMaxLinks);

    const handleMaxLinkChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLinksNumber(graph.getConnectedLinks(cell, {outbound: true}).length);
        setMaxNumberLinks(parseInt(event.target.value));
        cell.prop("maxLinks", parseInt(event.target.value));
    }

    useEffect(() => {
        setLinksNumber(currentLinksNumber)
    }, [currentLinksNumber])

    useEffect(() => {
        setMaxNumberLinks(currentMaxLinks);
    }, [currentMaxLinks])

    return (
        <TextField
            type={"number"}
            value={maxNumberLinks}
            InputProps={{inputProps: {inputclassname: styles.input, min: linksNumber}}}
            onChange={handleMaxLinkChange}/>
    )
}
