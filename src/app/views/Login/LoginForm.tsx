import React, { ChangeEvent, useState } from "react";
import FormInput from "./FormInput";
import "./login.scss";
import { Routes } from "../../types/enums";
import { loginUserThunk } from "../../store/usersSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { Redirect, useLocation } from "react-router";

interface stateType {
  from: { pathname: string };
}

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { state } = useLocation<stateType>();

  if (redirectToReferrer === true) {
    return <Redirect to={state?.from || "/"} />;
  }

  return (
    <form id="form-container">
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
        <button
          className="continue-button"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            dispatch(loginUserThunk({ username, password }));
            setRedirectToReferrer(true);
          }}
        >
          Log In
        </button>
      </div>
      <p className="change-mode-message">
        Don't have an account?
        <a id="change-mode-link" href={Routes.signup}>
          Sign Up
        </a>
      </p>
    </form>
  );
};

export default LoginForm;
