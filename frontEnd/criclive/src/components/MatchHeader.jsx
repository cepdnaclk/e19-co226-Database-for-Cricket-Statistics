import React from "react";
import styles from "../styles/MatchHeader.module.scss";
import Flag from "react-flagkit";
import classNames from "classnames";
const FLAG_SIZE = 65;

const flagName = {
  "Sri Lanka": "LK",
  India: "IN",
  Australia: "AU",
};
const MatchHeader = ({
  scoresData,
  matchInfo,
  teamNameMap,
  onStrikeBatsman,
  nonStrikeBatsman,
  battingTeamId,
  currentBowler,
}) => {
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
        <p>{getMatchStatusString(scoresData, teamNameMap)}</p>
        <p className={styles.matchInfo}>{matchInfo.matchName}</p>
      </div>
      <div
        className={classNames(
          styles.currentSummary,
          battingTeamId === 2 && styles.battingDetailsOnRight
        )}
      >
        <div className={styles.summaryItem}>
          <p>
            {onStrikeBatsman.name} * {onStrikeBatsman.runs}(
            {onStrikeBatsman.balls})
          </p>
          <p>
            {nonStrikeBatsman.name} {nonStrikeBatsman.runs}(
            {nonStrikeBatsman.balls})
          </p>
        </div>
        <div className={styles.summaryItem}>
          <p>
            {currentBowler.name} ({currentBowler.overs}.
            {currentBowler.ballNumber})
          </p>
        </div>
      </div>
    </div>
  );
};

const TeamInfoAndScore = ({ scoreObj, teamName }) => {
  let yetToBat = !scoreObj.isBatting;
  return (
    <div
      className={classNames(
        scoreObj.innings === 1 ? styles.home : styles.away,
        scoreObj.isBatting && styles.batting
      )}
    >
      <div className={styles.flagAndName}>
        <Flag
          country={flagName[teamName]}
          size={FLAG_SIZE}
          className={styles.flagIcon}
        />
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

const getMatchStatusString = (scoresData, teamNameMap) => {
  const MATCH_OVERS = 5;
  const battingTeamScoreObj = scoresData.find((scoreObj) => scoreObj.isBatting);
  const bowlingTeamScoreObj = scoresData.find(
    (scoreObj) => !scoreObj.isBatting
  );

  const currentRunRate = (
    battingTeamScoreObj.totalRuns /
    ((battingTeamScoreObj.overNum * 6 + battingTeamScoreObj.ballNumber) / 6)
  ).toFixed(1);
  const isChasing =
    scoresData[0].totalRuns !== null && scoresData[1].totalRuns !== null;
  if (isChasing) {
    const requiredRuns =
      bowlingTeamScoreObj.totalRuns - battingTeamScoreObj.totalRuns;
    const remainingBalls =
      MATCH_OVERS * 6 -
      (battingTeamScoreObj.overNum * 6 + battingTeamScoreObj.ballNumber);
    const remainingOvers = `${Math.floor(remainingBalls / 6)}.${
      remainingBalls % 6
    }`;
    const requiredRunRate = (requiredRuns / (remainingBalls / 6)).toFixed(1);

    if (remainingBalls > 100)
      return `${
        teamNameMap[battingTeamScoreObj.teamId]
      } needs ${requiredRuns} in ${remainingOvers} CRR:${currentRunRate} RRR:${requiredRunRate}`;
    else if (remainingBalls <= 100)
      return `${
        teamNameMap[battingTeamScoreObj.teamId]
      } needs ${requiredRuns} in ${remainingBalls}`;
  } else if (!isChasing) {
    return `Current Run Rate: ${currentRunRate}`;
  }
};
