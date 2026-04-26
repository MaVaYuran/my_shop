import React from 'react';
import styles from './Header.module.css';
import { NavLink } from 'react-router';
import { Logo } from './logo/Logo';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { Button } from '../button/Button';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import roles from '../../constants/roles';

export const Header = () => {
  const { isAuthenticated, user, token } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const name = user.name;
  const role = user.role;

  console.log('TOken', token);
  console.log('isAuthntic', isAuthenticated);
  console.log('user', user);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <header className={styles.headerContainer}>
      <Logo />
      <nav>
        {isAuthenticated ? (
          <div className={styles.headerContainer}>
            {role === roles.ADMIN ? (
              <NavLink to="/admin">Admin page</NavLink>
            ) : (
              <NavLink to="/cart">
                <HiOutlineShoppingCart />
              </NavLink>
            )}
            <span className={styles.logout} onClick={handleLogout}>
              Logout
            </span>
            <span>Hello, {name}</span>
          </div>
        ) : (
          <>
            <NavLink to="/register">Sign up</NavLink>
            <NavLink to="/login">Sign in</NavLink>
          </>
        )}
      </nav>
    </header>
  );
};
