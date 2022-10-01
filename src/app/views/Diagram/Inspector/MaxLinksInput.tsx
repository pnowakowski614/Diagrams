import { TextField } from "@mui/material";
import styles from "./inspector.module.scss";
import React, { ChangeEvent, useEffect, useState } from "react";
import { dia } from "@clientio/rappid";

interface MaxLinksInputProps {
    cellView: dia.CellView,
    linksNumber: number,
}

export const MaxLinksInput = ({cellView, linksNumber}: MaxLinksInputProps) => {
    const currentMaxLinks = cellView.model.prop("maxLinks") || linksNumber;

    const [maxNumberLinks, setMaxNumberLinks] = useState(currentMaxLinks);

    const handleMaxLinkChange = (event: ChangeEvent<HTMLInputElement>) => {
        setMaxNumberLinks(parseInt(event.target.value));
        cellView.model.prop("maxLinks", parseInt(event.target.value));
    }

    useEffect(() => {
        setMaxNumberLinks(currentMaxLinks);
    }, [currentMaxLinks])

    return (
        <TextField
            type={"number"}
            className={styles.input}
            value={maxNumberLinks}
            onChange={handleMaxLinkChange}/>
    )
}
