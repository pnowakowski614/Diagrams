import React, { ChangeEvent, useState } from "react";
import FormInput from "./FormInput";
import "./login.scss";
import { loginUserThunk } from "../../store/usersSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { useHistory } from "react-router-dom";
import { Routes } from "../../types/enums";

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    const res = await dispatch(loginUserThunk({ username, password }));
    if (res.payload.status === "ok") {
      localStorage.setItem("token", res.payload.user);
      history.push("/diagram");
    }
  };

  const handleLinkClick = () => {
    history.push(Routes.signup);
  };

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
          onClick={(e) => handleSubmit(e)}
        >
          Log In
        </button>
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
