import { TextField } from "@mui/material";
import styles from "./inspector.module.scss";
import React, { ChangeEvent, useEffect, useState } from "react";
import { dia } from "@clientio/rappid";

interface MaxLinksInputProps {
    cellView: dia.CellView,
    graph: dia.Graph
}

export const MaxLinksInput = ({cellView, graph}: MaxLinksInputProps) => {
    const currentLinksNumber = graph.getConnectedLinks(cellView.model, {outbound: true}).length;
    const currentMaxLinks = cellView.model.prop("maxLinks") || currentLinksNumber;
    const [linksNumber, setLinksNumber] = useState(currentLinksNumber);
    const [maxNumberLinks, setMaxNumberLinks] = useState(currentMaxLinks);

    const handleMaxLinkChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLinksNumber(graph.getConnectedLinks(cellView.model, {outbound: true}).length);
        setMaxNumberLinks(parseInt(event.target.value));
        cellView.model.prop("maxLinks", parseInt(event.target.value));
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
            InputProps={{inputProps: {inputClassName: styles.input, min: linksNumber}}}
            onChange={handleMaxLinkChange}/>
    )
}
