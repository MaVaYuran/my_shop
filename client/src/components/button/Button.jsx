import React from 'react';
import styles from './Button.module.css';

export const Button = ({ type, title }) => {
  return (
    <button className={styles.button} type={type}>
      {title}
    </button>
  );
};
