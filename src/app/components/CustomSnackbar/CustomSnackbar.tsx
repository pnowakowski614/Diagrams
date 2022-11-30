import {
  Alert,
  AlertColor,
  Snackbar,
  SnackbarCloseReason,
} from "@mui/material";
import React, { SyntheticEvent } from "react";

interface CustomSnackbarProps {
  message: string;
  open: boolean;
  severity: AlertColor;
  onClose?: (
    event: Event | SyntheticEvent<Element, Event>,
    reason: SnackbarCloseReason
  ) => void;
}

export const CustomSnackbar = ({
  message,
  open,
  severity,
  onClose,
}: CustomSnackbarProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={onClose}
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
    >
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  );
};
