import React, { ChangeEvent, useState } from "react";
import FormInput from "./FormInput";
import "./login.scss";
import { loginUserThunk } from "../../store/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useHistory } from "react-router-dom";
import { Routes } from "../../types/enums";
import { CircularProgress } from "@mui/material";

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isBeingLoggedIn } = useSelector((state: RootState) => state.users);

  const handleSubmit = async (e?: React.MouseEvent) => {
    e?.preventDefault();
    const res = await dispatch(loginUserThunk({ username, password }));
    if (res.payload.status === "ok") {
      localStorage.setItem("token", res.payload.user);
      history.push("/list");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleLinkClick = () => {
    history.push(Routes.signup);
  };

  return (
    <form onKeyDown={(e) => handleKeyPress(e)} id="form-container">
      <h1 className="login-header">Log In To Continue</h1>
      <div className="inputs">
        <FormInput
          type="text"
          placeholder="Username"
          name="username"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
        />
        <FormInput
          type="password"
          placeholder="Password"
          name="username"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
      </div>
      <div className="continue-button-container">
        {isBeingLoggedIn ? (
          <CircularProgress color="inherit" />
        ) : (
          <button
            className="continue-button"
            type="button"
            onClick={(e) => handleSubmit(e)}
          >
            Log In
          </button>
        )}
      </div>
      <p className="change-mode-message">
        Don't have an account?
        <button className="button-link" onClick={handleLinkClick}>
          Sign Up
        </button>
      </p>
    </form>
  );
};

export default LoginForm;
