import MatchHeader from "./components/MatchHeader";
import Menu from "./components/Menu";
import Scorecard from "./components/Scorecard";
import Commentary from "./components/Commentary";
import styles from "./styles/App.module.scss";
import { useState, useEffect } from "react";
import api from "./services/api";
import socket from "./services/socket";
import Preloader from "./components/Preloader";
// const scoresData = [
//   {
//     totalRuns: 225,
//     innings: 1,
//     extras: {
//       total: 10,
//       wides: 5,
//       noBalls: 2,
//       legByes: 2,
//       byes: 1,
//     },
//     wickets: 2,
//     overNum: 49,
//     ballNumber: 5,
//     teamId: 1,
//     isBatting: false,
//   },
//   {
//     totalRuns: 12,
//     innings: 2,
//     extras: {
//       total: 5,
//       wides: 2,
//       noBalls: 1,
//       legByes: 1,
//       byes: 1,
//     },
//     wickets: 0,
//     overNum: 1,
//     ballNumber: 1,
//     teamId: 2,
//     isBatting: true,
//   },
// ];

// const teamNameMap = {
//   1: "Sri Lanka",
//   2: "India",
// };
const App = () => {
  //menu Selection State
  const [selected, setSelected] = useState("scorecard");
  const [matchInfo, setMatchInfo] = useState({});
  const [teamsInfo, setTeamsInfo] = useState([{}, {}]);
  const [isLoading, setIsLoading] = useState(true);
  const [scoresData, setScoresData] = useState([]);
  const [teamNameMap, setTeamNameMap] = useState({});
  const [inningsOneBatsmenData, setInningsOneBatsmenData] = useState([]);
  const [inningsTwoBatsmenData, setInningsTwoBatsmenData] = useState([]);
  const [teamOnePlayers, setTeamOnePlayers] = useState([]);
  const [teamTwoPlayers, setTeamTwoPlayers] = useState([]);

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
            "tossWinningTeamId": 1,
            "matchName": "Australia vs India",
            "tossIsBatting": 1
          }
        */
      } catch (err) {
        console.log("Error: fetchMatchInfo");
        console.log(err);
        setTimeout(fetchMatchInfo, 3000);
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
        setTimeout(fetchTeamsInfo, 3000);
      }
    };

    const fetchTeamPlayersInfo = async () => {
      try {
        const responseTeamOne = await api.get(
          "/matchInfo/teams/details?teamId=1"
        );
        const responseTeamTwo = await api.get(
          "/matchInfo/teams/details?teamId=2"
        );
        /*
        [
          {
            "captain": true,
            "playerId": 2,
            "playerName": "Jane Smith",
            "playerType": "Bowler",
            "dateOfBirth": "1988-10-20T18:30:00.000Z",
            "teamId": 2
          },
          {
            "captain": false,
            "playerId": 4,
            "playerName": "Sarah Williams",
            "playerType": "Batsman",
            "dateOfBirth": "1995-07-03T18:30:00.000Z",
            "teamId": 2
          }
        ]

        */
        setTeamOnePlayers(responseTeamOne.data);
        setTeamTwoPlayers(responseTeamTwo.data);
      } catch (err) {
        console.log("Error: fetchTeamPlayers");
        console.log(err);
        setTimeout(fetchTeamPlayersInfo, 3000);
      }
    };

    fetchMatchInfo();
    fetchTeamsInfo();
    fetchTeamPlayersInfo();

    socket.on("connect", () => {
      console.log(`Socket Connected ID = ${socket.id}`);
    });

    socket.on("match-score", (data) => {
      console.log("scoresData", data);
      setScoresData(data);
    });

    socket.on("innings-one-batting", (data) => {
      console.log("innings-one-batting", data);
      setInningsOneBatsmenData(data);
    });

    socket.on("innings-two-batting", (data) => {
      console.log("innings-two-batting", data);
      setInningsTwoBatsmenData(data);
    });

    // socket.on("match-status", (data) => console.log("match-status", data));
  }, []);

  useEffect(() => {
    const teamNameMapTemp = {};

    for (const team of teamsInfo) {
      teamNameMapTemp[team.teamId] = team.teamName;
    }

    setTeamNameMap(teamNameMapTemp);
  }, [matchInfo, teamsInfo]);

  useEffect(() => {
    console.log({
      matchInfo: matchInfo,
      teamsInfo: teamsInfo,
      scoresData: scoresData,
      teamOnePlayers: teamOnePlayers,
      teamTwoPlayers: teamTwoPlayers,
      inningsOneBatsmenData: inningsOneBatsmenData,
      inningsTwoBatsmenData: inningsTwoBatsmenData,
    });
    if (
      Object.keys(teamsInfo[0]).length !== 0 &&
      Object.keys(teamsInfo[1]).length !== 0 &&
      Object.keys(matchInfo).length !== 0 &&
      scoresData.length !== 0 &&
      teamOnePlayers.length !== 0 &&
      teamTwoPlayers.length !== 0 &&
      inningsOneBatsmenData.length !== 0 &&
      inningsTwoBatsmenData.length !== 0
    ) {
      setIsLoading(false);
    }
  }, [
    matchInfo,
    teamsInfo,
    scoresData,
    teamOnePlayers,
    teamTwoPlayers,
    inningsOneBatsmenData,
    inningsTwoBatsmenData,
  ]);
  if (isLoading) return <Preloader />;

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
        <Scorecard
          scoresData={scoresData}
          teamNameMap={teamNameMap}
          inningsOneBatsmenData={inningsOneBatsmenData}
          inningsTwoBatsmenData={inningsTwoBatsmenData}
          teamOnePlayers={teamOnePlayers}
          teamTwoPlayers={teamTwoPlayers}
        />
      )}
      {selected === "commentary" && <Commentary />}
      <div className={styles.matchMeta}>
        <p>
          <span>Toss: </span>
          {/* Extract the team name of team who won the toss */}
          {teamNameMap[matchInfo.tossWinningTeamId]}
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
