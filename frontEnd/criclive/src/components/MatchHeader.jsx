import React from "react";
import styles from "../styles/MatchHeader.module.scss";
import Flag from "react-flagkit";
import classNames from "classnames";
import { getOverString } from "../utils";
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
  isMatchOver,
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
        <p>
          {getMatchStatusString(
            scoresData,
            teamNameMap,
            isMatchOver,
            matchInfo.matchType
          )}
        </p>
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
            {onStrikeBatsman !== null &&
              `${onStrikeBatsman.name}: * ${onStrikeBatsman.runs}(${onStrikeBatsman.balls})`}
          </p>
          <p>
            {nonStrikeBatsman !== null &&
              `${nonStrikeBatsman.name}: ${nonStrikeBatsman.runs}(${nonStrikeBatsman.balls})`}
          </p>
        </div>
        <div className={styles.summaryItem}>
          <p>
            {currentBowler.name}: {currentBowler.wickets}/{currentBowler.runs} (
            {currentBowler.overs}.{currentBowler.ballNumber})
          </p>
        </div>
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
          {yetToBat || `(${getOverString(scoreObj)})`}
        </p>
      </div>
    </div>
  );
};
export default MatchHeader;

const getMatchStatusString = (
  scoresData,
  teamNameMap,
  isMatchOver,
  matchType
) => {
  const MATCH_OVERS = matchType;
  const battingTeamScoreObj = scoresData.find((scoreObj) => scoreObj.isBatting);
  const bowlingTeamScoreObj = scoresData.find(
    (scoreObj) => !scoreObj.isBatting
  );

  //Match is Over --> display result
  if (isMatchOver) {
    // chasing team won
    if (battingTeamScoreObj.totalRuns > bowlingTeamScoreObj.totalRuns) {
      return `${teamNameMap[battingTeamScoreObj.teamId]} won by ${
        battingTeamScoreObj.wickets
      } wickets`;
    }

    // first bat team won
    else if (battingTeamScoreObj.totalRuns < bowlingTeamScoreObj.totalRuns) {
      return `${teamNameMap[bowlingTeamScoreObj.teamId]} won by ${
        bowlingTeamScoreObj.totalRuns - battingTeamScoreObj.totalRuns
      } runs`;
    }

    // tied
    else {
      return "Match Tied";
    }
  }

  //Match Not Over

  const currentRunRate = (
    battingTeamScoreObj.totalRuns /
    ((battingTeamScoreObj.overNum * 6 + battingTeamScoreObj.ballNumber) / 6)
  ).toFixed(1);

  const isChasing =
    scoresData[0].totalRuns !== null && scoresData[1].totalRuns !== null;

  // If second innings started.
  if (isChasing) {
    const requiredRuns =
      bowlingTeamScoreObj.totalRuns + 1 - battingTeamScoreObj.totalRuns;
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
      } needs ${requiredRuns} in ${remainingOvers} CRR: ${currentRunRate} RRR: ${requiredRunRate}`;
    else if (remainingBalls <= 100)
      return `${
        teamNameMap[battingTeamScoreObj.teamId]
      } needs ${requiredRuns} in ${remainingBalls} balls CRR: ${currentRunRate} RRR: ${requiredRunRate}`;
  }

  //End of 1st Innings
  else if (
    battingTeamScoreObj.overNum === MATCH_OVERS - 1 &&
    !isChasing &&
    battingTeamScoreObj.ballNumber === 6
  ) {
    const requiredRuns = battingTeamScoreObj.totalRuns + 1;

    const remainingOvers = MATCH_OVERS;
    const requiredRunRate = (requiredRuns / MATCH_OVERS).toFixed(1);

    return `${
      teamNameMap[bowlingTeamScoreObj.teamId]
    } needs ${requiredRuns} in ${remainingOvers} Overs RRR:${requiredRunRate}`;
  }

  //1st innings on Going
  else if (!isChasing) {
    return `Current Run Rate: ${currentRunRate}`;
  }
};
