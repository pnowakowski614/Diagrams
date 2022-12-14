import React, { SyntheticEvent } from "react";
import LoginForm from "./LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { CustomSnackbar } from "../../components/CustomSnackbar/CustomSnackbar";
import { clearLoggedOut, clearRejectedLogin } from "../../store/usersSlice";
import { SnackbarCloseReason } from "@mui/material";
import { AlertMessages } from "../../types/enums";

const Login = () => {
  const dispatch = useDispatch();
  const { isBeingLoggedIn, gotLoggedOut, loginRejected } = useSelector(
    (state: RootState) => state.users
  );

  const handleRejectedLoginClose = (
    event: Event | SyntheticEvent,
    reason: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      dispatch(clearRejectedLogin());
      return;
    }
  };

  const handleLoginSuccessClose = (
    event: Event | SyntheticEvent,
    reason: SnackbarCloseReason
  ) => {
    if (reason === "clickaway" || "timeout") {
      dispatch(clearLoggedOut());
      return;
    }
  };

  return (
    <>
      <CustomSnackbar
        message={AlertMessages.loggingIn}
        open={isBeingLoggedIn}
        severity="info"
      />
      <CustomSnackbar
        message={AlertMessages.loggedOut}
        open={gotLoggedOut}
        onClose={handleLoginSuccessClose}
        severity="success"
      />
      <CustomSnackbar
        message={AlertMessages.loginError}
        open={loginRejected}
        onClose={handleRejectedLoginClose}
        severity="error"
      />
      <div className="login-page-container">
        <LoginForm />
      </div>
    </>
  );
};

export default Login;
