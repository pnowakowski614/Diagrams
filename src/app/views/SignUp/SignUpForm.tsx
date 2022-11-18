import React, { ChangeEvent, useState } from "react";
import "../Login/login.scss";
import { Routes } from "../../types/enums";
import FormInput from "../Login/FormInput";
import { registerUser } from "../../API/fetchMethods";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  return (
    <form className="form-container">
      <h1 className="login-header">Create Your Account</h1>
      <div className="inputs">
        <FormInput
          type="text"
          placeholder="Username"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
        />
        <FormInput
          type="email"
          placeholder="E-mail"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
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
            registerUser(username, password, email);
          }}
        >
          Sign Up
        </button>
      </div>
      <p className="change-mode-message">
        Already have an account?
        <a id="change-mode-link" href={Routes.login}>
          Log In
        </a>
      </p>
    </form>
  );
};

export default SignUpForm;
