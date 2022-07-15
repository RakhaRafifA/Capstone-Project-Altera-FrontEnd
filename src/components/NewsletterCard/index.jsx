import React from "react";

/** Styles */
import styles from "./style.module.css";

const NewsLetterCard = ({ lists }) => {

  const months = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
  };

  return (
    <div className={styles.container}>
      <h5>List of Newsletter</h5>
      {
        lists?.length > 0 ? (
          <>
            {lists?.map((list) => {
              const date = new Date(list.createdAt);
              return (
                <div className={styles.wrapper} key={list?.id}>
                  <p className={styles.title}>{list.title}</p>
                  <p className={styles.content}>{list.description}</p>
                  <p className={styles.time}>{`Published: ${date.getDate()} ${months[date.getMonth()]
                    } ${date.getFullYear()}`}</p>
                </div>
              );
            })}
          </>
        ) : (
          <div className={styles.wrapper}>
            <h5 className={styles.title}>{lists.title}</h5>
            <p className={styles.content}>{lists.content}</p>
          </div>
        )
      }
    </div>
  );
};

export default NewsLetterCard;
