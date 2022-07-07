import React from 'react';
import "./shared_components.scss";

const Header = () => {
    return <header>
        <nav className="navbar">
            <span className="site-name">DIAGRAMS</span>
            <ul>
                <li>
                    <a href="/diagram">Create a Diagram</a>
                </li>
                <li>
                    <a href="/list">Diagram List</a>
                </li>
                <li>
                    <a href="/login">Login</a>
                </li>
                <li>
                    <a id="sign-up" href="/login">Sign Up</a>
                </li>
            </ul>
        </nav>
    </header>
}

export default Header;