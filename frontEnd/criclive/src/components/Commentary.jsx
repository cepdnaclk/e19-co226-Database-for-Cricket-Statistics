import classNames from "classnames";
import styles from "../styles/Commentary.module.scss";

const Commentary = ({ comments }) => {
  return (
    <div className={styles.container}>
      {comments !== undefined &&
        comments
          .toReversed()
          .map((commentObj) => (
            <BallComment
              ball={commentObj.ball}
              overString={`${commentObj.overNumber}.${commentObj.ballNumber}`}
              comment={commentObj.comment}
              key={commentObj.ballId}
            />
          ))}
    </div>
  );
};

export default Commentary;

const BallComment = ({ ball, comment, overString }) => {
  return (
    <>
      <div
        className={classNames(
          styles.ball,
          (ball === 4 || ball === 6) && styles.green,
          ball === "W" && styles.red
        )}
      >
        {ball}
      </div>
      <div className={styles.comment}>
        <span>{overString}: </span>
        {comment}
      </div>
    </>
  );
};
