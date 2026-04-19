import styles from './Input.module.css';

export const Input = ({ label, type, title, placeholder }) => {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={title} className={styles.label}>
        {label}:
      </label>
      <input
        className={styles.input}
        type={type}
        value={title}
        onChange={e => e.target.value}
        name={title}
        placeholder={placeholder}
      />
    </div>
  );
};
