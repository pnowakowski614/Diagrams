import React from "react";
import { Button, Toolbar } from "@mui/material";
import styles from "./diagramList.module.scss";

export interface DiagramBarProps {
    jsonObject: [{ cells: [], diagramName: string, id: number }]
    object: { cells: [], diagramName: string, id: number }
    handleOpen: (jsonObject: [{ cells: [], diagramName: string, id: number }], id: number) => void;
    handleDelete: (jsonObject: [{ cells: [], diagramName: string, id: number }], id: number) => void;
}

export const DiagramBar = ({jsonObject, object, handleOpen, handleDelete}: DiagramBarProps) => {
    return (
        <Toolbar key={object.id} className={styles.toolbar}>
            <h4>{object.id}</h4>
            <h4>{object.diagramName}</h4>
            <Button variant="contained" className={styles.button}
                    onClick={() => handleOpen(jsonObject, object.id)}>
                Open
            </Button>
            <Button variant="outlined"
                    onClick={() => handleDelete(jsonObject, object.id)}>
                Delete
            </Button>
        </Toolbar>
    )
}

