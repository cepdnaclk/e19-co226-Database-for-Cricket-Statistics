import styles from "../styles/Menu.module.scss";
import classNames from "classnames";
const Menu = ({ isMatchOver, selected, setSelected }) => {
  return (
    <div className={styles.menuContainer}>
      <div
        className={classNames(
          styles.menuItem,
          selected === "summary" && styles.active,
          !isMatchOver && styles.hide
        )}
        onClick={() => setSelected("summary")}
      >
        Summary
      </div>
      <div
        className={classNames(
          styles.menuItem,
          selected === "scorecard" && styles.active
        )}
        onClick={() => setSelected("scorecard")}
      >
        Scorecard
      </div>
      <div
        className={classNames(
          styles.menuItem,
          selected === "commentary" && styles.active
        )}
        onClick={() => setSelected("commentary")}
      >
        Commentary
      </div>
    </div>
  );
};

export default Menu;
