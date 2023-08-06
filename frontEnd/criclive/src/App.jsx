import MatchHeader from "./components/MatchHeader";
import Menu from "./components/Menu";
import Scorecard from "./components/Scorecard";
import Commentary from "./components/Commentary";
import styles from "./styles/App.module.scss";
import { useState, useEffect } from "react";
import api from "./services/api";
import socket from "./services/socket";
import Preloader from "./components/Preloader";
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
  const [isLoading, setIsLoading] = useState(true);
  // const [scoresData, setScoresData] = useState([]);
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
            "team1Id": 1,
            "team2Id": 1,
            "date": "2023-08-09T18:30:00.000Z",
            "time": "15:00:00",
            "venue": "Melbourne Stadium",
            "toss": 1,
            "matchName": "Australia vs India",
            "tossIsBatting": 1
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
            "teamId": 1,
            "teamName": "TeamA",
            "country": "Australia",
            "coach": "David Smith",
            "captainId": 1
          },
          {
            "teamId": 2,
            "teamName": "TeamB",
            "country": "India",
            "coach": "Raj Singh",
            "captainId": 2
          }
        ]
        */
      } catch (err) {
        console.log("Error: fetchMatchInfo");
        console.log(err);
      }
    };

    fetchMatchInfo();
    fetchTeamsInfo();

    socket.on("connect", () => {
      console.log(`Socket Connected ID = ${socket.id}`);
    });

    socket.on("match-score", (data) => console.log("match-score", data));
    socket.on("match-score", (data) => console.log("match-score", data));
  }, []);

  useEffect(() => {
    if (
      Object.keys(teamsInfo[0]).length !== 0 &&
      Object.keys(teamsInfo[1]).length !== 0 &&
      Object.keys(matchInfo).length !== 0
    ) {
      setIsLoading(false);
    }
  }, [matchInfo, teamsInfo]);
  if (isLoading)
    return (
      <div className={styles.preloaderContainer}>
        <Preloader />{" "}
      </div>
    );

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
          {teamsInfo.find((obj) => obj.teamId === matchInfo.toss).teamName +
            " "}
          won the toss and opted to bowl first
        </p>
        <p>
          {/* Extract the venue */}
          <span>Stadium: </span> {matchInfo.venue}
        </p>
      </div>
    </div>
  );
};

export default App;
