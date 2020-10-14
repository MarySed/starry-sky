import React from "react";
import styles from "./Card.module.scss";

type Props = {
  header: string;
  body: string;
};

const Card = ({ header, body }: Props) => {
  return (
    <div className={styles.card}>
      <div className={styles["card-text"]}>{header}</div>
      <div className={styles["card-text"]}>{body}</div>
    </div>
  );
};

export default Card;
