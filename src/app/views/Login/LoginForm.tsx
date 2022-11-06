import React, { ChangeEvent, useState } from 'react';
import FormInput from "./FormInput";
import './login.scss';
import { Routes } from "../../types/enums";
import { loginUser } from "../../API/fetchMethods";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <form className="form-container">
            <h1 className="login-header">Log In To Continue</h1>
            <div className="inputs">
                <FormInput placeholder="Username"
                           onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}/>
                <FormInput placeholder="Password"
                           onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}/>
            </div>
            <div className="continue-button-container">
                <button className="continue-button" type="button" onClick={(e) => {
                    e.preventDefault();
                    loginUser(username, password)
                }}>Log In
                </button>
            </div>
            <p className="change-mode-message">Don't have an account?
                <a id="change-mode-link" href={Routes.signup}>Sign Up</a>
            </p>
        </form>
    )
}

export default LoginForm;
