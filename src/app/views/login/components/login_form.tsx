import React from 'react';
import FormInput from "./input";
import '../login.scss';

const LoginForm = () => {
    return (
        <form className="form-container">
            <h1 className="login-header">Log In To Continue</h1>
            <div className="inputs">
                <FormInput placeholder="Username" />
                <FormInput placeholder="Password" />
            </div>
            <div className="continue-button-container">
                <button className="continue-button">Continue</button>
            </div>
            <p className="change-mode">Don't have an account? <a id="sign-up-mode" href="/login">Sign up</a></p>
        </form>
    )
}

export default LoginForm;