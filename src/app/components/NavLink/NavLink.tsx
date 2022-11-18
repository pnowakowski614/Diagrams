import { Link, LinkProps } from "react-router-dom";
import styles from "./navLink.module.scss";
import React from "react";

interface NavLinkProps extends LinkProps {
  customClassName?: string;
}

const NavLink = ({ customClassName, ...linkProps }: NavLinkProps) => {
  return (
    <Link className={`${styles.link} ${customClassName}`} {...linkProps} />
  );
};

export default NavLink;
