import React, {
  ChangeEvent,
  FormEvent,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import "../Login/login.scss";
import { AlertMessages, Routes } from "../../types/enums";
import FormInput from "../Login/FormInput";
import { CustomSnackbar } from "../../components/CustomSnackbar/CustomSnackbar";
import { CircularProgress, SnackbarCloseReason } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { createUser } from "../../store/usersSlice";

const SignUpForm = () => {
  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [, setConfirmPassword] = useState("");
  const [isFormInvalid, setIsFormInvalid] = useState(false);
  const [duplicate, setDuplicate] = useState(false);
  const [inputArray, setIsInputArray] = useState<HTMLInputElement[] | null>(
    null
  );
  const { isBeingSignedUp } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    const form = document.querySelector(".inputs");
    const inputs = Array.from(form!.querySelectorAll("input"));
    setIsInputArray(inputs);
  }, []);

  const validateInputs = () => {
    const isValid = inputArray!.map((input) => {
      if (!input.checkValidity()) {
        return false;
      }
    });
    if (isValid.includes(false)) {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (validateInputs()) {
      const data = await dispatch(createUser({ username, password, email }));
      if (data.payload && data.payload.status === "ok") {
        localStorage.setItem("token", data.payload.user);
        history.push("/diagram");
      } else {
        setDuplicate(true);
      }
    } else {
      setIsFormInvalid(true);
    }
  };

  const handleClose = (
    event: Event | SyntheticEvent,
    reason: SnackbarCloseReason
  ) => {
    if (reason === "clickaway" || "timeout") {
      setIsFormInvalid(false);
      setDuplicate(false);
      return;
    }
  };

  const handleLinkClick = () => {
    history.push(Routes.login);
  };

  return (
    <>
      <CustomSnackbar
        message={AlertMessages.invalidForm}
        open={isFormInvalid}
        severity="error"
        onClose={handleClose}
      />
      <CustomSnackbar
        message={AlertMessages.duplicate}
        open={duplicate}
        severity="error"
        onClose={handleClose}
      />
      <form id="form-container" onInvalid={() => setIsFormInvalid(true)}>
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
          {isBeingSignedUp ? (
            <CircularProgress color="inherit" />
          ) : (
            <button
              className="continue-button"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Sign Up
            </button>
          )}
        </div>
        <p className="change-mode-message">
          Already have an account?
          <button className="button-link" onClick={handleLinkClick}>
            Log In
          </button>
        </p>
      </form>
    </>
  );
};

export default SignUpForm;
