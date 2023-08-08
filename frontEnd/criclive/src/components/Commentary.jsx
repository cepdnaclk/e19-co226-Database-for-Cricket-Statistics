import classNames from "classnames";
import styles from "../styles/Commentary.module.scss";
import api from "../services/api";
import { useEffect } from "react";
const comments = [
  {
    ball: "4",
    comment:
      "23.2: J. Bumrah to Pathum Nissanka, FOUR! Nice and fine! On the pads, this is worked down towards the fine leg fence for a boundary.",
  },
];
const RETRY_DELAY = 2000;
const Commentary = ({ matchStatus }) => {
  useEffect(() => {
    const fetchPastCommentary = async () => {
      try {
        const response = await api.get("/commentry");
        console.log(response);
      } catch (err) {
        console.log("Error: fetchPastCommentary");
        console.log(err);
        setTimeout(fetchPastCommentary, RETRY_DELAY);
      }
    };

    fetchPastCommentary();
  }, []);
  return (
    <div className={styles.container}>
      <BallComment
        ball="4"
        comment="23.2: J. Bumrah to Pathum Nissanka, FOUR! Nice and fine! On the pads, this is worked down towards the fine leg fence for a boundary."
      />

      <BallComment
        ball="W"
        comment="23.1: J. Bumrah to Pathum Nissanka, FOUR! Nice and fine! On the pads, this is worked down towards the fine leg fence for a boundary."
      />

      <BallComment
        ball="2"
        comment="22.6 H. Pandya to Kusal Mendis, Easy Couple"
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
