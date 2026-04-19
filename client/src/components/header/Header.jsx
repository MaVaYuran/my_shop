import React from 'react';
import styles from './Header.module.css';
import { NavLink } from 'react-router';
import { Logo } from './logo/Logo';

export const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <Logo />
      <nav>
        <NavLink to="/register">Sign up</NavLink>
        <NavLink to="/login">Sign in</NavLink>
      </nav>
    </header>
  );
};
