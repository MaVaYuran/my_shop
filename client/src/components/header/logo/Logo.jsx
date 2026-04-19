import React from 'react';
import { BsGlobe2 } from 'react-icons/bs';
import styles from './Logo.module.css';

export const Logo = () => {
  return (
    <a className={styles.logoContainer} href="/">
      <h3>Universe Shop</h3>
      <BsGlobe2 />
    </a>
  );
};
