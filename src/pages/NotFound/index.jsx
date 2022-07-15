import React from "react";
import { useNavigate } from "react-router-dom";

/** Styles */
import styles from "./style.module.css";

/** Components */
import Button from "../../components/Button";

/** Images */
import not_found_illustration from "../../assets/img/not_found_illustration.gif";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.img_wrapper}>
          <img
            src={not_found_illustration}
            alt="Not Found Illustration"
            className={styles.error404}
          />
        </div>
        <div className={styles.text_wrapper}>
          <h1>404 - PAGE NOT FOUND</h1>
          <p>THE PAGE YOU REQUESTED COULD NOT BE FOUND</p>
          <div className={styles.btn_container}>
            <Button
              text="Login Page"
              className={styles.btn}
              secondary={true}
              onClick={() => navigate("/login")}
            />
            <Button
              text="Previous page"
              className={styles.btn}
              onClick={() => navigate(-1)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
