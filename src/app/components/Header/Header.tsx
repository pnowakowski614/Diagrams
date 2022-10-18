import React from 'react';
import styles from './header.module.scss';
import NavLink from "../NavLink/NavLink";
import { Routes } from "../../types/enums";

const Header = () => {
    return <header>
        <nav className={styles.navbar}>
            <span className={styles.siteName}>DIAGRAMS</span>
            <ul>
                <NavLink to={Routes.diagram}>
                    Create a Diagram
                </NavLink>
                <NavLink to={Routes.diagramList}>
                    Diagram list
                </NavLink>
                <NavLink to={Routes.login}>
                    Login
                </NavLink>
                <NavLink customClassName={styles.signUp} to={Routes.login}>
                    Sign Up
                </NavLink>
            </ul>
        </nav>
    </header>
}

export default Header;
