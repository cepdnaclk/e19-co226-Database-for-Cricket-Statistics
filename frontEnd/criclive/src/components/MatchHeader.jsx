import React from "react";
import styles from "../styles/MatchHeader.module.scss";

function MatchHeader() {
  return (
    <div className={styles.header}>
      <div className={styles.scores}>
        <div className={styles.home}></div>
        <div className={styles.away}></div>
      </div>
    </div>
  );
}

export default MatchHeader;
