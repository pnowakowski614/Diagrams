import React from "react";
import styles from "./header.module.scss";
import NavLink from "../NavLink/NavLink";
import { Routes } from "../../types/enums";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { clearUserInfo } from "../../store/usersSlice";

const Header = () => {
  const isUserLoggedIn = useSelector(
    (state: RootState) => state.users.isUserLoggedIn
  );
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(clearUserInfo());
  };

  return (
    <header>
      <nav className={styles.navbar}>
        <span className={styles.siteName}>DIAGRAMS</span>
        <ul>
          <NavLink to={Routes.diagram}>Create a Diagram</NavLink>
          <NavLink to={Routes.diagramList}>Diagram list</NavLink>
          <NavLink to={Routes.login}>Log In</NavLink>
          {isUserLoggedIn ? (
            <NavLink
              onClick={handleClick}
              customClassName={styles.signUp}
              to={Routes.login}
            >
              Log Out
            </NavLink>
          ) : (
            <NavLink customClassName={styles.signUp} to={Routes.signup}>
              Sign Up
            </NavLink>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
