import { Alert, AlertColor, Snackbar } from "@mui/material";
import React from "react";

interface CustomSnackbarProps {
  message: string;
  open: boolean;
  severity: AlertColor;
}

export const CustomSnackbar = ({
  message,
  open,
  severity,
}: CustomSnackbarProps) => {
  return (
    <Snackbar
      open={open}
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
    >
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  );
};
