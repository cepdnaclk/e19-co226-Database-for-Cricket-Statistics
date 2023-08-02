import MatchHeader from "./components/MatchHeader";
import Menu from "./components/Menu";
import Scorecard from "./components/Scorecard";
import Commentary from "./components/Commentary";
import styles from "./styles/App.module.scss";
import { useState } from "react";
const App = () => {
  const [selected, setSelected] = useState("scorecard");
  const isMatchOver = false;
  return (
    <div className={styles.container}>
      <MatchHeader />
      <Menu
        selected={selected}
        setSelected={setSelected}
        isMatchOver={isMatchOver}
      />
      {selected === "scorecard" && <Scorecard />}
      {selected === "commentary" && <Commentary />}
    </div>
  );
};

export default App;
