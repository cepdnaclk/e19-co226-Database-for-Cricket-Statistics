import React from "react";
import styles from "../styles/MatchHeader.module.scss";
import Flag from "react-flagkit";
const FLAG_SIZE = 65;
function MatchHeader() {
  return (
    <div className={styles.header}>
      <img
        className={styles.logo}
        src="./CricLive-Dark.svg"
        alt="cricLive Logo"
      />
      <div className={styles.scores}>
        <div className={styles.home}>
          <div className={styles.flagAndName}>
            <Flag country="LK" size={FLAG_SIZE} />
            <p>Sri Lanka</p>
          </div>
          <div className={styles.score}>
            <p className={styles.runsWickets}>225</p>
            <p className={styles.overs}>(49.5)</p>
          </div>
        </div>
        <div className={styles.away}>
          <div className={styles.flagAndName}>
            <Flag country="IN" size={FLAG_SIZE} />
            <p>India</p>
          </div>
          <div className={styles.score}>
            <p className={styles.runsWickets}>130/5</p>
            <p className={styles.overs}>(23)</p>
          </div>
        </div>
      </div>

      <div className={styles.status}>
        <p>IND needs 96 runs in 27 Overs</p>
        <p className={styles.matchInfo}>Final · Asia Cup 2023</p>
      </div>
    </div>
  );
}

export default MatchHeader;
