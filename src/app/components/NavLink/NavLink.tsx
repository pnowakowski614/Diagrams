import { Link } from "react-router-dom";
import styles from "./navLink.module.scss";
import React from "react";
import { NavLinkProps } from "../../types/interfaces";

const NavLink = ({customClassName, ...linkProps}: NavLinkProps) => {
    return <Link className={`${styles.link} ${customClassName}`} {...linkProps} />;
}

export default NavLink;
