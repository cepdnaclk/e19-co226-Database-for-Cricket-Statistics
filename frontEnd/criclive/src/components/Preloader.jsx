import React from "react";
import styles from "../styles/Preloader.module.scss";
const Preloader = () => {
  return (
    <div className={styles.preloaderContainer}>
      <div className={styles["lds-roller"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Preloader;
