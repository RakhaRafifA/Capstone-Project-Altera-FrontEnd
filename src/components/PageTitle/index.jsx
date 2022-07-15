/** Styles */
import styles from "./style.module.css";

const PageTitle = ({ icon, title }) => {
    return (
        <div className={styles.container}>
            <div className={styles.icon}>{icon}</div>
            <div className={styles.title}>{title}</div>
        </div>
    );
};

export default PageTitle;