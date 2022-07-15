import React from "react";

/** Styles */
import styles from "./style.module.css";

const Information = ({ icon, title, children }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>{icon}</div>
      <div className={styles.right}>
        <span className={styles.title}>{title}</span>
        <span className={styles.info}>{children}</span>
      </div>
    </div>
  );
};

export default Information;
