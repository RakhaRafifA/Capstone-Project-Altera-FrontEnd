import React from "react";

/** Styles */
import styles from "./style.module.css";

const ContentCard = ({ lists }) => {
  return (
    <div className={styles.container}>
      <h5>List of Content</h5>
      {lists?.length > 0 ? (
        <>
          {lists?.map((list) => {
            return (
              <div className={styles.wrapper} key={list?.id}>
                <p className={styles.title}>{list.title}</p>
                <p className={styles.link}>
                  Link Youtube: <a href={list.videoUrl}> {list.videoUrl}</a>
                </p>
              </div>
            );
          })}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ContentCard;
