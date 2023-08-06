import React from "react";
import styles from "../styles/MatchHeader.module.scss";
import Flag from "react-flagkit";
import classNames from "classnames";
const FLAG_SIZE = 65;

const flagName = {
  "Sri Lanka": "LK",
  India: "IN",
};
const MatchHeader = ({ scoresData, teamNameMap }) => {
  return (
    <div className={styles.header}>
      <img
        className={styles.logo}
        src="./CricLive-Dark.svg"
        alt="cricLive Logo"
      />
      <div className={styles.scores}>
        <TeamInfoAndScore
          scoreObj={scoresData[0]}
          teamName={teamNameMap[scoresData[0].teamId]}
        />
        <TeamInfoAndScore
          scoreObj={scoresData[1]}
          teamName={teamNameMap[scoresData[1].teamId]}
        />
      </div>

      <div className={styles.status}>
        <p>IND needs 96 runs in 27 Overs</p>
        <p className={styles.matchInfo}>Final · Asia Cup 2023</p>
      </div>
    </div>
  );
};

const TeamInfoAndScore = ({ scoreObj, teamName }) => {
  let yetToBat = scoreObj.totalRuns === null;
  return (
    <div
      className={classNames(
        scoreObj.innings === 1 ? styles.home : styles.away,
        scoreObj.isBatting && styles.batting
      )}
    >
      <div className={styles.flagAndName}>
        <Flag country={flagName[teamName]} size={FLAG_SIZE} />
        <p>{teamName}</p>
      </div>
      <div className={styles.score}>
        <p className={styles.runsWickets}>
          {yetToBat
            ? "Yet to Bat"
            : scoreObj.totalRuns + "/" + scoreObj.wickets}
        </p>
        <p className={styles.overs}>
          {yetToBat || `(${scoreObj.overNum}.${scoreObj.ballNumber})`}
        </p>
      </div>
    </div>
  );
};
export default MatchHeader;
