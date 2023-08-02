import MatchHeader from "./components/MatchHeader";
import styles from "./styles/App.module.scss";
const App = () => {
  return (
    <div className={styles.container}>
      <img
        className={styles.logo}
        src="./CricLive-Dark.svg"
        alt="cricLive Logo"
      />
      <MatchHeader />
    </div>
  );
};

export default App;
