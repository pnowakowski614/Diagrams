import { TextField } from "@mui/material";
import styles from "./inspector.module.scss";
import React, { ChangeEvent, useEffect, useState } from "react";
import { MaxLinksInputProps } from "../../../types/interfaces";

export const MaxLinksInput = ({cell, graph}: MaxLinksInputProps) => {
    const currentLinksNumber = graph.getConnectedLinks(cell, {outbound: true}).length;

    const currentMaxLinks = () => {
        if (cell.prop("maxLinks") < currentLinksNumber) {
            cell.prop("maxLinks", currentLinksNumber)
        } else if (cell.prop("maxLinks") === undefined) {
            cell.prop("maxLinks", 3)
        }
        return cell.prop("maxLinks");
    }

    const [linksNumber, setLinksNumber] = useState(currentLinksNumber);
    const [maxNumberLinks, setMaxNumberLinks] = useState(currentMaxLinks);

    const handleMaxLinkChange = (event: ChangeEvent<HTMLInputElement>) => {
        const intInputValue = parseInt(event.target.value);

        setLinksNumber(currentLinksNumber);
        setMaxNumberLinks(intInputValue);

        cell.prop("maxLinks", intInputValue);
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
