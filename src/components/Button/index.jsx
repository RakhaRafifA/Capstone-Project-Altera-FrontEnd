/** Styles */
import styles from "./style.module.css";

const Button = ({ text, type, onClick, secondary }) => {
  return secondary ? (
    <button type={type} className={styles.secondary} onClick={onClick}>
      {text}
    </button>
  ) : (
    <button type={type} className={styles.btn} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
