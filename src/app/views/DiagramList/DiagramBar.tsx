import React from "react";
import { Box, Button } from "@mui/material";
import styles from "./diagramList.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export interface DiagramBarProps {
  object: { _id: string; diagramName: string };
  handleOpen: (_id: string) => void;
  handleDelete: (_id: string) => void;
  index: number;
}

export const DiagramBar = ({
  index,
  object,
  handleOpen,
  handleDelete,
}: DiagramBarProps) => {
  const currentId = useSelector((state: RootState) => state.diagrams.diagramId);

  return (
    <Box className={styles.box}>
      <span className={styles.index}>{index + 1}</span>
      <span className={styles.diagramName}>
        {object.diagramName} {currentId === object._id && "(active)"}
      </span>
      <Button
        variant="contained"
        className={styles.button}
        onClick={() => handleOpen(object._id)}
      >
        Open
      </Button>
      <Button variant="outlined" onClick={() => handleDelete(object._id)}>
        Delete
      </Button>
    </Box>
  );
};
