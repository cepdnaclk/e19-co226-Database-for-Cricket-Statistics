import classNames from "classnames";
import styles from "../styles/Scorecard.module.scss";
import { useEffect, useState } from "react";
import api from "../services/api";
// const inningsOneBatsmenData = [
//   {
//     name: "Pathum Nissanka",
//     howOut: "b J.Bumrah",
//     runs: "40",
//     balls: "35",
//     fours: "4",
//     sixes: "1",
//     sr: "114.29",
//   },
//   {
//     name: "Kusal Mendis",
//     howOut: "b Y.Chahal",
//     runs: "0",
//     balls: "1",
//     fours: "0",
//     sixes: "0",
//     sr: "0.00",
//   },
// ];

// const teamOnePlayers = [
//   "Kusal Mendis",
//   "Pathum Nissanka",
//   "Charith Asalanka",
//   "Dasun Shanaka",
// ];
// const inningsOneBowlersData = [
//   {
//     name: "Jaspreet Bumrah",
//     overs: "10",
//     maidens: "1",
//     wickets: "3",
//     runs: "37",
//     econ: "3.7",
//   },

//   {
//     name: "Yuzzy Chahal",
//     overs: "10",
//     maidens: "2",
//     wickets: "2",
//     runs: "27",
//     econ: "2.7",
//   },
// ];

// const inningsTwoBatsmenData = [
//   {
//     name: "Rohit Sharma",
//     howOut: "Not Out",
//     runs: "6",
//     balls: "10",
//     fours: "1",
//     sixes: "0",
//     sr: "60.0",
//   },
//   {
//     name: "Ishan Kishan",
//     howOut: "Not Out",
//     runs: "3",
//     balls: "3",
//     fours: "0",
//     sixes: "0",
//     sr: "100.0",
//   },
// ];
// const teamTwoPlayers = [
//   "Rohit Sharma",
//   "Ishan Kishan",
//   "Virat Kohli",
//   "Ravindra Jadeja",
// ];
// const inningsTwoBowlersData = [
//   {
//     name: "Dilshan Madushanka",
//     overs: "1",
//     maidens: "0",
//     wickets: "0",
//     runs: "8",
//     econ: "8",
//   },

//   {
//     name: "Kasun Rajitha",
//     overs: "0",
//     maidens: "0",
//     wickets: "0",
//     runs: "4",
//     econ: "-",
//   },
// ];

const Scorecard = ({
  scoresData,
  teamNameMap,
  inningsOneBatsmenData,
  inningsTwoBatsmenData,
  teamOnePlayers,
  teamTwoPlayers,
  inningsOneBowlersData,
  inningsTwoBowlersData,
}) => {
  const [inningsSelected, setInningsSelected] = useState(
    scoresData[0].isBatting ? 1 : 2
  );

  return (
    <>
      <div className={styles.inningsSelector}>
        <div
          className={classNames(
            styles.inningsItem,
            inningsSelected === 1 && styles.active
          )}
          onClick={() => setInningsSelected(1)}
        >
          {teamNameMap[scoresData[0].teamId]}
        </div>
        <div
          className={classNames(
            styles.inningsItem,
            inningsSelected === 2 && styles.active
          )}
          onClick={() => setInningsSelected(2)}
        >
          {teamNameMap[scoresData[1].teamId]}
        </div>
      </div>

      {inningsSelected === 1 ? (
        <InningsInfo
          teamPlayers={teamOnePlayers}
          inningsBatsmenData={inningsOneBatsmenData}
          inningsBowlersData={inningsOneBowlersData}
          scoresObj={scoresData[inningsSelected - 1]}
          key={inningsSelected}
        />
      ) : (
        <InningsInfo
          teamPlayers={teamTwoPlayers}
          inningsBatsmenData={inningsTwoBatsmenData}
          inningsBowlersData={inningsTwoBowlersData}
          scoresObj={scoresData[inningsSelected - 1]}
          key={inningsSelected}
        />
      )}
    </>
  );
};

const InningsInfo = ({
  teamPlayers,
  inningsBatsmenData,
  inningsBowlersData,
  scoresObj,
}) => {
  if (inningsBatsmenData.length === 0)
    return (
      <div className={styles.scorecardContainer}>
        <p className={styles.teamLineUp}>Team Line Up</p>
        {teamPlayers.map((player) => {
          return (
            <div className={styles.playerInfo}>
              <p className={styles.playerName}>{player.playerName}</p>
              <p className={styles.playerType}>{player.playerType}</p>
            </div>
          );
        })}
      </div>
    );
  return (
    <div className={styles.scorecardContainer}>
      <BattingTable
        scoresObj={scoresObj}
        inningsBatsmenData={inningsBatsmenData}
      />
      <br />
      <div className={styles.yetToBat}>
        Yet to Bat
        <ul>
          {teamPlayers
            .filter(
              (player) =>
                !inningsBatsmenData.some(
                  (obj) => obj.playerId === player.playerId
                )
            )
            .map((player, index) => (
              <li key={index}>{player.playerName}</li>
            ))}
        </ul>
        <br />
      </div>
      <BowlingTable inningsBowlersData={inningsBowlersData} />
    </div>
  );
};
const BowlingTable = ({ inningsBowlersData }) => {
  return (
    <table>
      <thead>
        <tr>
          <th className={styles.tableTopic}>Bowling</th>
          <th>O</th>
          <th>M</th>
          <th>R</th>
          <th>W</th>
          <th>Econ </th>
        </tr>
      </thead>
      <tbody>
        {/* Scorecard Batsmen Info */}

        {inningsBowlersData.map((dataObj) => (
          <BowlerFigure {...dataObj} key={dataObj.playerId} />
        ))}
      </tbody>
    </table>
  );
};

const BattingTable = ({ scoresObj, inningsBatsmenData }) => {
  return (
    <table>
      <thead>
        <tr>
          <th className={styles.tableTopic}>Batting</th>
          <th>R</th>
          <th>B</th>
          <th>4s</th>
          <th>6s</th>
          <th>S/R</th>
        </tr>
      </thead>
      <tbody>
        {/* Scorecard Batsmen Info */}
        {inningsBatsmenData.map((dataObj) => (
          <BatsmanScore {...dataObj} />
        ))}
        {/* Extras */}
        <tr>
          <td className={styles.alignLeft}>Extras</td>
          <td>{scoresObj.extras.total}</td>
          <td colSpan={4} className={styles.alignLeft}>
            ({scoresObj.extras.wides}W, {scoresObj.extras.noBalls}NB,{" "}
            {scoresObj.extras.legByes}LB, {scoresObj.extras.byes}B)
          </td>
        </tr>

        {/* Total Runs */}
        <tr>
          <td className={styles.alignLeft}>Total Runs</td>
          <td>{scoresObj.totalRuns}</td>
          <td colSpan={4} className={styles.alignLeft}>
            ({scoresObj.wickets} Wickets, {scoresObj.overNum}.
            {scoresObj.ballNumber} Overs)
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const BatsmanScore = ({ name, howOut, runs, balls, fours, sixes, sr }) => {
  return (
    <tr>
      <td>
        <p className={styles.batsmanName}>{name}</p>
        <p className={styles.howOut}>{howOut}</p>
      </td>
      <td>{runs}</td>
      <td>{balls}</td>
      <td>{fours}</td>
      <td>{sixes}</td>
      <td>{sr}</td>
    </tr>
  );
};

const BowlerFigure = ({
  name,
  overs,
  maidens,
  runs,
  wickets,
  econ,
  ballNumber,
}) => {
  return (
    <tr>
      <td>
        <p className={styles.batsmanName}>{name}</p>
      </td>
      <td>
        {overs}.{ballNumber}
      </td>
      <td>{maidens}</td>
      <td>{runs}</td>
      <td>{wickets}</td>
      <td>{econ}</td>
    </tr>
  );
};
export default Scorecard;
