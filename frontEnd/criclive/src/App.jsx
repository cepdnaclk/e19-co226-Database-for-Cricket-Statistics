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

const RETRY_DELAY = 1000;
const App = () => {
  //States
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
  const [inningsOneBowlersData, setInningsOneBowlersData] = useState([]);
  const [inningsTwoBowlersData, setInningsTwoBowlersData] = useState([]);
  const [comments, setComments] = useState([]);
  const [latestComment, setlatestComment] = useState({});
  const [onStrikeBatsman, setOnStrikeBatsman] = useState({});
  const [nonStrikeBatsman, setNonStrikeBatsman] = useState({});
  const [currentBowler, setCurrentBowler] = useState({});
  const [battingTeamId, setBattingTeamId] = useState();

  //Match finished or not
  const isMatchOver = false;

  //Fetching MatchInfo From Endpoints
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
        setTimeout(fetchMatchInfo, RETRY_DELAY);
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
        setTimeout(fetchTeamsInfo, RETRY_DELAY);
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
        setTimeout(fetchTeamPlayersInfo, RETRY_DELAY);
      }
    };

    const fetchPastCommentary = async () => {
      try {
        const response = await api.get("/commentry");
        console.log("commentary ", response);
        setComments(response.data);
      } catch (err) {
        console.log("Error: fetchPastCommentary");
        console.log(err);
        setTimeout(fetchPastCommentary, RETRY_DELAY);
      }
    };

    fetchMatchInfo();
    fetchTeamsInfo();
    fetchTeamPlayersInfo();
    fetchPastCommentary();
  }, []);

  //Sockets
  useEffect(() => {
    function onMatchScore(data) {
      console.log("scoresData", data);
      setScoresData(data.sort((a, b) => a.innings - b.innings));
      setBattingTeamId(
        data.find((scoresObj) => scoresObj.isBatting === true).teamId
      );
    }

    function onInningsOneBatting(data) {
      console.log("innings-one-batting", data);
      setInningsOneBatsmenData(data);
    }

    function onInningsTwoBatting(data) {
      console.log("innings-two-batting", data);
      setInningsTwoBatsmenData(data);
    }

    function onInningsOneBowling(data) {
      console.log("innings-one-balling", data);
      setInningsOneBowlersData(data);
    }

    function onInningsTwoBowling(data) {
      console.log("innings-two-balling", data);
      setInningsTwoBowlersData(data);
    }

    function onlatestComment(data) {
      setlatestComment(data);
      console.log("match-status", data);
    }
    socket.on("connect", () => {
      console.log(`Socket Connected ID = ${socket.id}`);
    });

    socket.on("match-score", onMatchScore);
    socket.on("innings-one-batting", onInningsOneBatting);
    socket.on("innings-two-batting", onInningsTwoBatting);
    socket.on("innings-one-balling", onInningsOneBowling);
    socket.on("innings-two-balling", onInningsTwoBowling);
    socket.on("match-status", onlatestComment);

    return () => {
      socket.off("match-score", onMatchScore);
      socket.off("innings-one-batting", onInningsOneBatting);
      socket.off("innings-two-batting", onInningsTwoBatting);
      socket.off("innings-one-balling", onInningsOneBowling);
      socket.off("innings-two-balling", onInningsTwoBowling);
      socket.off("match-status", onlatestComment);
    };
  }, []);

  useEffect(() => {
    const teamNameMapTemp = {};

    for (const team of teamsInfo) {
      teamNameMapTemp[team.teamId] = team.teamName;
    }

    setTeamNameMap(teamNameMapTemp);
  }, [matchInfo, teamsInfo]);

  //set preloader conditions
  useEffect(() => {
    console.log({
      matchInfo: matchInfo,
      teamsInfo: teamsInfo,
      scoresData: scoresData,
      teamOnePlayers: teamOnePlayers,
      teamTwoPlayers: teamTwoPlayers,
    });
    if (
      Object.keys(teamsInfo[0]).length !== 0 &&
      Object.keys(teamsInfo[1]).length !== 0 &&
      Object.keys(matchInfo).length !== 0 &&
      scoresData.length !== 0 &&
      teamOnePlayers.length !== 0 &&
      teamTwoPlayers.length !== 0 &&
      comments.length !== 0 &&
      (battingTeamId === 1
        ? inningsOneBatsmenData.length !== 0
        : inningsTwoBatsmenData.length !== 0)
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
    battingTeamId,
    comments,
  ]);

  //Finding the current batsmen and bowlers
  useEffect(() => {
    if (isLoading) return;

    const batsmenData =
      battingTeamId === 1 ? inningsOneBatsmenData : inningsTwoBatsmenData;

    const bowlersData =
      battingTeamId === 1 ? inningsOneBowlersData : inningsTwoBowlersData;
    setCurrentBowler(bowlersData.find((bowler) => bowler.currentBowler));
    setOnStrikeBatsman(
      batsmenData.find(
        (batsman) => batsman.onStrike && batsman.howOut === "Not Out"
      ) || null
    );

    //have to check howOut === "Not Out" condition
    setNonStrikeBatsman(
      batsmenData.find(
        (batsman) => !batsman.onStrike && batsman.howOut === "Not Out"
      ) || null
    );
  }, [
    inningsOneBatsmenData,
    inningsTwoBatsmenData,
    inningsOneBowlersData,
    inningsTwoBowlersData,
    battingTeamId,
    isLoading,
  ]);

  //update commentary with latest Comment
  useEffect(() => {
    if (isLoading) return;

    setComments((prevComments) => {
      if (
        prevComments.length !== 0 &&
        prevComments.slice(-1)[0].ballId === latestComment.ballId &&
        prevComments.slice(-1)[0].ball === latestComment.ball &&
        prevComments.slice(-1)[0].overNumber === latestComment.overNumber
      )
        return prevComments;

      //shift the array so maximum objects contained is 20
      if (prevComments.length >= 20) prevComments.shift();

      return [...prevComments, latestComment];
    });
  }, [latestComment]);

  //If loading return the preloader
  if (isLoading) return <Preloader />;

  return (
    <div className={styles.container}>
      <MatchHeader
        scoresData={scoresData}
        teamNameMap={teamNameMap}
        battingTeamId={battingTeamId}
        onStrikeBatsman={onStrikeBatsman}
        nonStrikeBatsman={nonStrikeBatsman}
        currentBowler={currentBowler}
        matchInfo={matchInfo}
        isMatchOver={latestComment.matchOver}
      />
      <Menu
        selected={selected}
        setSelected={setSelected}
        isMatchOver={latestComment.matchOver}
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
          inningsOneBowlersData={inningsOneBowlersData}
          inningsTwoBowlersData={inningsTwoBowlersData}
        />
      )}
      {selected === "commentary" && <Commentary comments={comments} />}
      <div className={styles.matchMeta}>
        <p>
          <span>Toss: </span>
          {/* Extract the team name of team who won the toss */}
          {teamNameMap[matchInfo.tossWinningTeamId] + " "}
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
