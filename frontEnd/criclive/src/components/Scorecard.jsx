import classNames from "classnames";
import styles from "../styles/Scorecard.module.scss";
import { useState } from "react";
const inningsOneBatsmenData = [
  {
    name: "Pathum Nissanka",
    howOut: "b J.Bumrah",
    runs: "40",
    balls: "35",
    fours: "4",
    sixes: "1",
    sr: "114.29",
  },
  {
    name: "Kusal Mendis",
    howOut: "b Y.Chahal",
    runs: "0",
    balls: "1",
    fours: "0",
    sixes: "0",
    sr: "0.00",
  },
];
const teamOnePlayers = [
  "Kusal Mendis",
  "Pathum Nissanka",
  "Charith Asalanka",
  "Dasun Shanaka",
];
const inningsOneBowlersData = [
  {
    name: "Jaspreet Bumrah",
    overs: "10",
    maidens: "1",
    wickets: "3",
    runs: "37",
    econ: "3.7",
  },

  {
    name: "Yuzzy Chahal",
    overs: "10",
    maidens: "2",
    wickets: "2",
    runs: "27",
    econ: "2.7",
  },
];

const Scorecard = () => {
  const [inningsSelected, setInningsSelected] = useState(1);
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
          Sri Lanka
        </div>
        <div
          className={classNames(
            styles.inningsItem,
            inningsSelected === 2 && styles.active
          )}
          onClick={() => setInningsSelected(2)}
        >
          India
        </div>
      </div>
      <div className={styles.scorecardContainer}>
        <BattingTable inningsSelected={inningsSelected} />
        <br />
        <div className={styles.yetToBat}>
          Yet to Bat
          <ul>
            {inningsSelected === 1 &&
              teamOnePlayers
                .filter(
                  (name) =>
                    !inningsOneBatsmenData.some((obj) => obj.name === name)
                )
                .map((name, index) => <li>{name}</li>)}
          </ul>
          <br />
        </div>
        <BowlingTable inningsSelected={inningsSelected} />
      </div>
    </>
  );
};
const BowlingTable = ({ inningsSelected }) => {
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
        {inningsSelected === 1 &&
          inningsOneBowlersData.map((dataObj) => <BowlerFigure {...dataObj} />)}
      </tbody>
    </table>
  );
};

const BattingTable = ({ inningsSelected }) => {
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
        {inningsSelected === 1 &&
          inningsOneBatsmenData.map((dataObj) => <BatsmanScore {...dataObj} />)}

        {/* Extras */}
        <tr>
          <td className={styles.alignLeft}>Extras</td>
          <td>8</td>
          <td colSpan={4} className={styles.alignLeft}>
            {" "}
            (4W, 2LB, 1B, 1NB)
          </td>
        </tr>

        {/* Total Runs */}
        <tr>
          <td className={styles.alignLeft}>Total Runs</td>
          <td>130</td>
          <td colSpan={4} className={styles.alignLeft}>
            (5 Wickets, 23 Overs)
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

const BowlerFigure = ({ name, overs, maidens, runs, wickets, econ }) => {
  return (
    <tr>
      <td>
        <p className={styles.batsmanName}>{name}</p>
      </td>
      <td>{overs}</td>
      <td>{maidens}</td>
      <td>{runs}</td>
      <td>{wickets}</td>
      <td>{econ}</td>
    </tr>
  );
};
export default Scorecard;
