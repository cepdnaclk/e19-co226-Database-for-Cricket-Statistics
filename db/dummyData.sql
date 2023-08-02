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
