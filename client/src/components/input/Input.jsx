import styles from './Input.module.css';

export const Input = ({ label, type, title, value, ...rest }) => {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={title} className={styles.label}>
        {label}:
      </label>
      <input
        className={styles.input}
        type={type}
        title={title}
        value={value}
        id={title}
        {...rest}
      />
    </div>
  );
};
