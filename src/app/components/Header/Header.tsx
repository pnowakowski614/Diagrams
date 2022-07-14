import React from 'react';
import styles from './header.module.scss';
import { Link } from 'react-router-dom';

const Header = () => {
    return <header>
        <nav className={styles.navbar}>
            <span className={styles.siteName}>DIAGRAMS</span>
            <ul>
                <Link className={styles.link} to={"/diagram"}>
                    Create a Diagram
                </Link>
                <Link className={styles.link} to={"/list"}>
                    Diagram list
                </Link>
                <Link className={styles.link} to={"/login"}>
                    Login
                </Link>
                <Link className={`${styles.link} ${styles.signUp}`} to={"/login"}>
                    Sign Up
                </Link>
            </ul>
        </nav>
    </header>
}

export default Header;