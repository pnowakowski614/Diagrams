import React, { SyntheticEvent } from "react";
import LoginForm from "./LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { CustomSnackbar } from "../../components/CustomSnackbar/CustomSnackbar";
import { clearRejectedLogin } from "../../store/usersSlice";
import { SnackbarCloseReason } from "@mui/material";

const Login = () => {
  const dispatch = useDispatch();
  const { isBeingLoggedIn, gotLoggedOut, loginRejected } = useSelector(
    (state: RootState) => state.users
  );

  const handleClose = (
    event: Event | SyntheticEvent,
    reason: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      dispatch(clearRejectedLogin());
      return;
    }
  };

  return (
    <>
      <CustomSnackbar
        message="You're being logged in, please wait."
        open={isBeingLoggedIn}
        severity="info"
      />
      <CustomSnackbar
        message="Successfully logged out!"
        open={gotLoggedOut}
        severity="success"
      />
      <CustomSnackbar
        message="Wrong username or password!"
        open={loginRejected}
        onClose={handleClose}
        severity="error"
      />
      <div className="login-page-container">
        <LoginForm />
      </div>
    </>
  );
};

export default Login;
