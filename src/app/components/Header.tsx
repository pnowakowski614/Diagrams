import React from 'react';
import "./shared_components.scss";
import { Link } from "react-router-dom";

const Header = () => {
    return <header>
        <nav className="navbar">
            <span className="site-name">DIAGRAMS</span>
            <ul>
                <Link className="link" to={"/diagram"}>
                    Create a Diagram
                </Link>
                <Link className="link" to={"/list"}>
                    Diagram list
                </Link>
                <Link className="link" to={"/login"}>
                    Login
                </Link>
                <Link className="link" to={"/login"}>
                    Sign Up
                </Link>
            </ul>
        </nav>
    </header>
}

export default Header;