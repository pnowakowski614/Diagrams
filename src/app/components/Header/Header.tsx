import React from 'react';
import styles from './header.module.scss';
import NavLink from "../NavLink/NavLink";

const Header = () => {
    return <header>
        <nav className={styles.navbar}>
            <span className={styles.siteName}>DIAGRAMS</span>
            <ul>
                <NavLink to={"/diagram"}>
                    Create a Diagram
                </NavLink>
                <NavLink to={"/list"}>
                    Diagram list
                </NavLink>
                <NavLink to={"/login"}>
                    Login
                </NavLink>
                <NavLink customClassName={styles.signUp} to={"/login"}>
                    Sign Up
                </NavLink>
            </ul>
        </nav>
    </header>
}

export default Header;