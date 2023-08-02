import classNames from "classnames";
import styles from "../styles/Commentary.module.scss";
const Commentary = () => {
  return (
    <div className={styles.container}>
      <BallComment
        ball="4"
        comment="23.2: J. Bumrah to Pathum Nissanka, FOUR! Nice and fine! On the pads, this is worked down towards the fine leg fence for a boundary."
      />

      <BallComment
        ball="W"
        comment="23.2: J. Bumrah to Pathum Nissanka, FOUR! Nice and fine! On the pads, this is worked down towards the fine leg fence for a boundary."
      />
    </div>
  );
};

export default Commentary;

const BallComment = ({ ball, comment }) => {
  return (
    <>
      <div
        className={classNames(
          styles.ball,
          (ball === "4" || ball === "6") && styles.green,
          ball === "W" && styles.red
        )}
      >
        {ball}
      </div>
      <div className={styles.comment}>{comment}</div>
    </>
  );
};
