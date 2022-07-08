import React, { useState } from 'react';
import FormInput from "./input";
import '../login.scss';

const LoginForm = () => {
    const [isLoginActive, changeMode] = useState(true);

    const switchMode = () => {
        changeMode(!isLoginActive);
    }

    return (
        <form className="form-container">
            <h1 className="login-header">{isLoginActive ? "Log In To Continue" : "Create Your Account"}</h1>
            <div className="inputs">
                <FormInput placeholder="Username"/>
                {!isLoginActive && <FormInput placeholder="E-mail" />}
                <FormInput placeholder="Password"/>
                {!isLoginActive && <FormInput placeholder="Confirm Password" />}
            </div>
            <div className="continue-button-container">
                <button className="continue-button">{isLoginActive ? "Log In" : "Sign Up"}</button>
            </div>
            <p className="change-mode-message">{isLoginActive ? "Don't" : "Already"} have an account?
                <a id="change-mode-link" href="#" onClick={switchMode}>
                    {isLoginActive ? " Sign Up" : " Sign In"}</a>
            </p>
        </form>
    )
}

export default LoginForm;