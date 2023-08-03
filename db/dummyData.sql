INSERT INTO TEAM (TeamID, TeamName, Country, Coach, CaptainID)
VALUES
    (1, 'Team A', 'Country A', 'Coach A', 1),
    (2, 'Team B', 'Country B', 'Coach B', 2);


INSERT INTO PLAYER (PlayerID, PlayerName, PlayerType, DateofBirth, TeamID)
VALUES
    (1, 'Player 1', 'Batsman', '1990-01-01', 1),
    (2, 'Player 2', 'Bowler', '1992-03-15', 1),
    (3, 'Player 3', 'All-Rounder', '1988-07-20', 2),
    (4, 'Player 4', 'Bowler', '1995-05-10', 2);


INSERT INTO CURRENTMATCH (Team1_ID, Team2_ID, Date, Time, Venue, Toss)
VALUES
    (1, 2, '2023-08-02', '14:00:00', 'Stadium A', 2);


INSERT INTO BALL (Ball_ID, Over, BallNumber, Economy, RunsScored, CurrentRR, RequiredRR, OnStrikeID, NonStrikeID, CurrentBowlerID)
VALUES
    (1, 1, 1, 4.5, 5, 6.0, 7.0, 1, 2, 3),
    (2, 1, 2, 6.0, 4, 7.0, 6.5, 2, 1, 3);


INSERT INTO EXTRA (Ball_ID, Type, ExtraRuns)
VALUES
    (1, 'Wide', 1),
    (2, 'No Ball', 2);


INSERT INTO DISMISSAL (Ball_ID, DismissType, CaughtBy, StumpedBy, FieldedBy, Dismissed, Retired)
VALUES
    (1, 'Caught', 4, NULL, NULL, 2, NULL),
    (2, 'Bowled', NULL, NULL, NULL, 3, NULL);
    

///////////////////////////////////////////////////////////////////////////////////


INSERT INTO `PLAYER` (`PlayerID`, `PlayerName`, `PlayerType`, `DateofBirth`) VALUES
(101, 'John Smith', 'Batsman', '1990-05-15'),
(102, 'Mike Johnson', 'Bowler', '1992-09-20'),
(103, 'David Miller', 'Fielder', '1988-07-12'),
(104, 'Chris Harris', 'Batsman', '1995-03-25'),
(105, 'Sarah Williams', 'Bowler', '1993-11-05');

--
-- Dumping data for table `TEAM`
--

INSERT INTO `TEAM` (`TeamID`, `TeamName`, `Country`, `Coach`, `CaptainID`) VALUES
(1, 'Team A', 'Country A', 'Coach A', 101),
(2, 'Team B', 'Country B', 'Coach B', 103),
(3, 'Team C', 'Country C', 'Coach C', 105);

--
-- Dumping data for table `TEAMPLAYERS`
--

INSERT INTO `TEAMPLAYERS` (`PlayerID`, `TeamID`) VALUES
(101, 1),
(102, 1),
(103, 2),
(104, 2),
(105, 3);



INSERT INTO `BALL` (`Ball_ID`, `OverNum`, `BallNumber`, `Economy`, `RunsScored`, `CurrentRR`, `RequiredRR`, `OnStrikeID`, `NonStrikeID`, `CurrentBowlerID`) VALUES
(1, 1, 1, 7.25, 5, 8.5, 9.0, 101, 102, 103),
(2, 1, 2, 5.5, 3, 7.0, 9.5, 101, 102, 103),
(3, 2, 1, 6.75, 6, 8.0, 9.25, 102, 101, 103);

--
-- Dumping data for table `CURRENTMATCH`
--

INSERT INTO `CURRENTMATCH` (`Team1_ID`, `Team2_ID`, `Date`, `Time`, `Venue`, `Toss`) VALUES
(1, 2, '2023-08-02', '19:30:00', 'Stadium A', 1);

--
-- Dumping data for table `DISMISSAL`
--

INSERT INTO `DISMISSAL` (`Ball_ID`, `DismissType`, `CaughtBy`, `StumpedBy`, `FieldedBy`, `Dismissed`, `Retired`) VALUES
(3, 'Caught', 105, NULL, NULL, 101, NULL);

--
-- Dumping data for table `EXTRA`
--

INSERT INTO `EXTRA` (`Ball_ID`, `Type`, `ExtraRuns`) VALUES
(3, 'Bye', 2);

--
-- Dumping data for table `PLAYER`
--

