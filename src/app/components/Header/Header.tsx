import React from "react";
import styles from "./header.module.scss";
import NavLink from "../NavLink/NavLink";
import { Routes } from "../../types/enums";
import { RootState } from "../../store/store";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { clearUserInfo } from "../../store/usersSlice";

const Header = () => {
  const isUserLoggedIn = useSelector(
    (state: RootState) => state.users.isUserLoggedIn
  );
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = () => {
    dispatch(clearUserInfo());
    history.push(Routes.login);
  };

  return (
    <header>
      <nav className={styles.navbar}>
        <span className={styles.siteName}>DIAGRAMS</span>
        <ul>
          {isUserLoggedIn && (
            <>
              <NavLink to={Routes.diagram}>Create a Diagram</NavLink>
              <NavLink to={Routes.diagramList}>Diagram list</NavLink>
              <Button
                onClick={handleClick}
                sx={{ backgroundColor: "#bd242f", color: "white" }}
              >
                Logout
              </Button>
            </>
          )}
          {!isUserLoggedIn && (
            <>
              <NavLink to={Routes.login}>Login</NavLink>
              <NavLink customClassName={styles.signUp} to={Routes.signup}>
                Sign Up
              </NavLink>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
