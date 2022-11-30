import React from "react";
import { Button, Toolbar } from "@mui/material";
import styles from "./diagramList.module.scss";

export interface DiagramBarProps {
    object: { _id: string, diagramName: string }
    handleOpen: (_id: string) => void;
    handleDelete: (_id: string) => void;
    index: number;
}

export const DiagramBar = ({index, object, handleOpen, handleDelete}: DiagramBarProps) => {
    return (
        <Toolbar key={object._id} className={styles.toolbar} sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1000px 100px 100px",
        }}>
            <h4>{index + 1}</h4>
            <h4>{object.diagramName}</h4>
            <Button variant="contained" className={styles.button}
                    onClick={() => handleOpen(object._id)}>
                Open
            </Button>
            <Button variant="outlined"
                    onClick={() => handleDelete(object._id)}>
                Delete
            </Button>
        </Toolbar>
    )
}

