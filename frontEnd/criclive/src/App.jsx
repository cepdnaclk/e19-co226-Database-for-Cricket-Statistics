import MatchHeader from "./components/MatchHeader";
import Menu from "./components/Menu";
import Scorecard from "./components/Scorecard";
import styles from "./styles/App.module.scss";
import { useState } from "react";
const App = () => {
  const [selected, setSelected] = useState("scorecard");
  const isMatchOver = false;
  return (
    <div className={styles.container}>
      <img
        className={styles.logo}
        src="./CricLive-Dark.svg"
        alt="cricLive Logo"
      />
      <MatchHeader />
      <Menu
        selected={selected}
        setSelected={setSelected}
        isMatchOver={isMatchOver}
      />
      <Scorecard />
    </div>
  );
};

export default App;
