import classNames from "classnames";
import styles from "../styles/Scorecard.module.scss";
import { useState } from "react";
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
        <table>
          <thead>
            <tr>
              <th className={styles.batsmanInfo}>Batting</th>
              <th>R</th>
              <th>B</th>
              <th>4s</th>
              <th>6s</th>
              <th>S/R</th>
            </tr>

            <BatsmanScore
              name="Pathum Nissanka"
              howOut="b J.Bumrah"
              runs="40"
              balls="35"
              fours="4"
              sixes="1"
              sr="114.29"
            />
          </thead>
        </table>
      </div>
    </>
  );
};

const BatsmanScore = ({ name, howOut, runs, balls, fours, sixes, sr }) => {
  return (
    <tr>
      <td>
        <p className={styles.batsmanName}>Pathum Nissanka</p>
        <p className={styles.howOut}>b J. Bumrah</p>
      </td>
      <td>40</td>
      <td>35</td>
      <td>4</td>
      <td>1</td>
      <td>114.29</td>
    </tr>
  );
};

export default Scorecard;
