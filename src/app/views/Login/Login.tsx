import React from "react";
import LoginForm from "./LoginForm";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { CustomSnackbar } from "../../components/CustomSnackbar/CustomSnackbar";

const Login = () => {
  const isLoading = useSelector(
    (state: RootState) => state.users.isBeingLoggedIn
  );

  return (
    <>
      <CustomSnackbar
        message="You're being logged in."
        open={isLoading}
        severity="info"
      />
      <div className="login-page-container">
        <LoginForm />
      </div>
    </>
  );
};

export default Login;
