/** Images */
import logo from "../../assets/svg/logo.svg";

/** Styles */
import styles from "./style.module.css";

const TitleLogo = () => {
    return (
        <div className={styles.container}>
            <img src={logo} alt="Logo" />
            <h1>Sportly</h1>
        </div>
    );
};

export default TitleLogo;