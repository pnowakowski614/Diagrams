import React from "react";
import { Button, Toolbar } from "@mui/material";
import styles from "./diagramList.module.scss";

export interface DiagramBarProps {
    diagramList: [{ cells: [], diagramName: string, _id: string }]
    object: { cells: [], diagramName: string, _id: string }
    handleOpen: (diagramList: [{ cells: [], diagramName: string, _id: string }], _id: string) => void;
    handleDelete: (diagramList: [{ cells: [], diagramName: string, _id: string }], _id: string) => void;
    index: number;
}

export const DiagramBar = ({index, diagramList, object, handleOpen, handleDelete}: DiagramBarProps) => {
    return (
        <Toolbar key={object._id} className={styles.toolbar} sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1000px 100px 100px",
        }}>
            <h4>{index + 1}</h4>
            <h4>{object.diagramName}</h4>
            <Button variant="contained" className={styles.button}
                    onClick={() => handleOpen(diagramList, object._id)}>
                Open
            </Button>
            <Button variant="outlined"
                    onClick={() => handleDelete(diagramList, object._id)}>
                Delete
            </Button>
        </Toolbar>
    )
}

