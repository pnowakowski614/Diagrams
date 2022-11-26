import React, { ChangeEvent, useState } from "react";
import "../Login/login.scss";
import { Routes } from "../../types/enums";
import FormInput from "../Login/FormInput";
import { registerUser } from "../../API/fetchMethods";

const SignUpForm = () => {
  const form = document.getElementById("form-container") as HTMLSelectElement;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (form) {
      if (form.checkValidity()) {
        registerUser(username, password, email);
      } else {
        alert("Invalid form!");
      }
    } else {
      alert("Invalid form!");
    }
  };

  return (
    <form id="form-container">
      <h1 className="login-header">Create Your Account</h1>
      <div className="inputs">
        <FormInput
          type="text"
          name="username"
          placeholder="Username"
          errorMessage="Username should be 3-10 characters long and shouldn't include any special characters!"
          pattern="^[A-Za-z0-9]{3,10}$"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
          required={true}
        />
        <FormInput
          type="email"
          name="email"
          placeholder="E-mail"
          errorMessage="Invalid e-mail!"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          required={true}
        />
        <FormInput
          type="password"
          name="password"
          placeholder="Password"
          errorMessage="Password should be 8-20 characters long and include at least 1 letter, 1 number and 1 special character!"
          pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          required={true}
        />
        <FormInput
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          errorMessage="Passwords don't match!"
          pattern={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setConfirmPassword(e.target.value)
          }
          required={true}
        />
      </div>
      <div className="continue-button-container">
        <button
          className="continue-button"
          type="button"
          onClick={(e) => {
            handleSubmit(e);
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
