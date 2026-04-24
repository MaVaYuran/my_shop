import React from 'react';
import styles from './Button.module.css';

export const Button = ({ title, type, onClick, isActive, ...rest }) => {
  const btnClass = isActive ? `${styles.button} ${styles.active}` : styles.button;
  return (
    <button className={btnClass} type={type} onClick={onClick} {...rest}>
      {title}
    </button>
  );
};
