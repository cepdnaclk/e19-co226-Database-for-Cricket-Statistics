import MatchHeader from "./components/MatchHeader";
import Menu from "./components/Menu";
import Scorecard from "./components/Scorecard";
import Commentary from "./components/Commentary";
import styles from "./styles/App.module.scss";
import { useState, useEffect } from "react";
import api from "./services/api";
import socket from "./services/socket";
const scoresData = [
  {
    totalRuns: 225,
    innings: 1,
    extras: {
      total: 10,
      wides: 5,
      noBalls: 2,
      legByes: 2,
      byes: 1,
    },
    wickets: 2,
    overNum: 49,
    ballNumber: 5,
    teamId: 1,
    isBatting: false,
  },
  {
    totalRuns: 12,
    innings: 2,
    extras: {
      total: 5,
      wides: 2,
      noBalls: 1,
      legByes: 1,
      byes: 1,
    },
    wickets: 0,
    overNum: 1,
    ballNumber: 1,
    teamId: 2,
    isBatting: true,
  },
];

const teamNameMap = {
  1: "Sri Lanka",
  2: "India",
};
const App = () => {
  //menu Selection State
  const [selected, setSelected] = useState("scorecard");
  const [matchInfo, setMatchInfo] = useState({});
  const [teamsInfo, setTeamsInfo] = useState([{}, {}]);
  //Match finished or not
  const isMatchOver = false;

  //Fetching MatchInfo From Endpoint
  useEffect(() => {
    const fetchMatchInfo = async () => {
      try {
        const response = await api.get("/matchInfo");
        setMatchInfo(response.data);
        /* Sample response
          {
            "Team1_ID": 1,
            "Team2_ID": 2,
            "Date": "2023-08-09T18:30:00.000Z",
            "Time": "15:00:00",
            "Venue": "Melbourne Stadium",
            "Toss": 1,
            "MatchName": "Australia vs India",
            "TossIsBatting": 1
          } 
        */
      } catch (err) {
        console.log("Error: fetchMatchInfo");
        console.log(err);
      }
    };

    const fetchTeamsInfo = async () => {
      try {
        const response = await api.get("/matchInfo/teams");
        setTeamsInfo(response.data);

        /* Sample response
        [
          {
            "TeamID":1,
            "TeamName":"TeamA",
            "Country":"Australia",
            "Coach":"David Smith",
            "CaptainID":1},
            
          {
            "TeamID":2,
            "TeamName":"TeamB",
            "Country":"India",
            "Coach":"Raj Singh",
            "CaptainID":2}
          ]
        */
      } catch (err) {
        console.log("Error: fetchMatchInfo");
        console.log(err);
      }
    };

    fetchTeamsInfo();
    fetchMatchInfo();

    // socket.on("connect", () => {
    //   console.log(`Socket Connected ID = ${socket.id}`);
    // });
  }, []);

  return (
    <div className={styles.container}>
      <MatchHeader scoresData={scoresData} teamNameMap={teamNameMap} />
      <Menu
        selected={selected}
        setSelected={setSelected}
        isMatchOver={isMatchOver}
      />

      {/* If selected == "scorecard" then show the scorecard component
        else if selected == "commentary" then show the commentary component
      */}
      {selected === "scorecard" && (
        <Scorecard scoresData={scoresData} teamNameMap={teamNameMap} />
      )}
      {selected === "commentary" && <Commentary />}
      <div className={styles.matchMeta}>
        <p>
          <span>Toss: </span>
          {/* Extract the team name of team who won the toss */}
          IND won the toss and opted to bowl first
        </p>
        <p>
          {/* Extract the venue */}
          <span>Stadium: </span> {matchInfo.Venue}
        </p>
      </div>
    </div>
  );
};

export default App;
