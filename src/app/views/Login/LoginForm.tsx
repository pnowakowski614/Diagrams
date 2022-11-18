import React, { ChangeEvent, useState } from "react";
import FormInput from "./FormInput";
import "./login.scss";
import { Routes } from "../../types/enums";
import { loginUserThunk } from "../../store/usersSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form className="form-container">
      <h1 className="login-header">Log In To Continue</h1>
      <div className="inputs">
        <FormInput
          type="text"
          placeholder="Username"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
        />
        <FormInput
          type="password"
          placeholder="Password"
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
