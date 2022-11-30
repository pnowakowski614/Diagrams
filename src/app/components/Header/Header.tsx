import React, { useEffect, useState } from "react";
import styles from "./header.module.scss";
import NavLink from "../NavLink/NavLink";
import { Routes } from "../../types/enums";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { clearUserInfo } from "../../store/usersSlice";
import { clearCurrentDiagram, clearCurrentId } from "../../store/diagramsSlice";
import { useLocation } from "react-router";

const Header = () => {
  const location = useLocation();
  const isUserLoggedIn = useSelector(
    (state: RootState) => state.users.isUserLoggedIn
  );

  const dispatch = useDispatch();
  const [isListOpened, setIsListOpened] = useState(false);

  const handleClick = () => {
    dispatch(clearUserInfo());
  };

  const handleNewDiagram = () => {
    dispatch(clearCurrentDiagram());
    dispatch(clearCurrentId());
  };

  useEffect(() => {
    if (location.pathname === Routes.diagramList) {
      setIsListOpened(true);
    } else {
      setIsListOpened(false);
    }
  }, [location]);

  return (
    <header>
      <nav className={styles.navbar}>
        <span className={styles.siteName}>DIAGRAMS</span>
        <ul>
          {isUserLoggedIn ? (
            <>
              {isListOpened ? (
                <>
                  <NavLink onClick={handleNewDiagram} to={Routes.diagram}>
                    Create New Diagram
                  </NavLink>
                </>
              ) : (
                <NavLink to={Routes.diagramList}>Diagram list</NavLink>
              )}
              <NavLink
                onClick={handleClick}
                customClassName={styles.signUp}
                to={Routes.login}
              >
                Log Out
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to={Routes.login}>Log In</NavLink>
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
