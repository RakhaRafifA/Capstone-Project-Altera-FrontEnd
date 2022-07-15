import React from "react";

/** Styles */
import styles from "./style.module.css";

const Container = ({ children, title }) => {
  return (
    <div className={`mb-4  ${styles.container}`}>
      <div className={styles.content_wrapper}>
        <h5>{title}</h5>
        {children}
      </div>
    </div>
  );
};

export default Container;
