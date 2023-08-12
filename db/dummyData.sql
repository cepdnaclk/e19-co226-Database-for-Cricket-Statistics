INSERT INTO PLAYER (PlayerID, PlayerName, PlayerType, DateofBirth)
VALUES
    (1, 'Dasun Shanaka', 'Batsman', '1991-09-09'),
    (2, 'Dimuth Karunarathne', 'Batsman', '1988-04-21'),
    (3, 'Pathum Nissanka', 'Batsman', '1995-08-06'),
    (4, 'Kusal Mendis', 'Batsman', '1995-02-02'),
    (5, 'Charith Asalanka', 'Batsman', '1997-07-30'),
    (6, 'Dhananjaya De Silva', 'All-Rounder', '1991-09-06'),
    (7, 'Wanindu Hasaranga', 'All-Rounder', '1997-07-29'),
    (8, 'Maheesh Theekshana', 'Bowler', '1999-06-12'),
    (9, 'Kasun Rajitha', 'Bowler', '1993-10-08'),
    (10, 'Dilshan Madushanka', 'Bowler', '1999-03-20'),
    (11, 'Matheesha Pathirana', 'Bowler', '2002-01-21'),

    (12, 'Virat Kohli', 'Batsman', '1988-11-05'),
    (13, 'Rohit Sharma', 'Batsman', '1987-04-30'),
    (14, 'KL Rahul', 'Batsman', '1992-04-18'),
    (15, 'Shikhar Dhawan', 'Batsman', '1985-12-05'),
    (16, 'Suryakumar Yadav', 'Batsman', '1990-09-14'),
    (17, 'Rishabh Pant', 'Batsman', '1997-10-04'),
    (18, 'Hardik Pandya', 'All-Rounder', '1993-10-11'),
    (19, 'Ravindra Jadeja', 'All-Rounder', '1988-12-06'),
    (20, 'Washington Sundar', 'All-Rounder', '1999-10-05'),
    (21, 'Shardul Thakur', 'Bowler', '1991-10-16'),
    (22, 'Jasprit Bumrah', 'Bowler', '1993-12-06');

INSERT INTO TEAM (TeamID, TeamName, Country, Coach, CaptainID)
VALUES
    (1, 'Sri Lanka', 'Sri Lanka', 'Chris Silverman', 1),
    (2, 'India', 'India', 'Rahul Dravid', 1);

INSERT INTO TEAMPLAYERS (PlayerID, TeamID)
VALUES 
    (1, 1),
    (2, 1),
    (3, 1),
    (4, 1),
    (5, 1),
    (6, 1),
    (7, 1),
    (8, 1),
    (9, 1),
    (10, 1),
    (11, 1),

    (12, 2),
    (13, 2),
    (14, 2),
    (15, 2),
    (16, 2),
    (17, 2),
    (18, 2),
    (19, 2),
    (20, 2),
    (21, 2),
    (22, 2);



INSERT INTO CURRENTMATCH (Team1_ID, Team2_ID, Date, Time, Venue, Toss, MatchName, TossIsBatting, MatchType)
VALUES
    (1, 2, '2023-08-02', '14:00:00', 'R. Premadasa Stadium', 2, "Final · Asia Cup 2023", 1, 2);



-- Insert data into INNINGS1 table
INSERT INTO INNINGS1 (Ball_ID, OverNum, BallNumber, RunsScored, OnStrikeID, NonStrikeID, CurrentBowlerID, Commentary) VALUES
(1, 1, 1, 4, 2, 3, 22, "Four!! First Ball of the Final of the Asia Cup 2023. Dimuth Karunathne on Strike. Juspreet Bumrah running in from the Lake End and strays on to the Pads of Karunathne who flicks it away to the mid-wicket boundary"),
(2, 1, 2, 1, 2, 3, 22, "Fuller One by Bumrash nudged away for a single"),
(3, 1, 3, 1, 3, 2, 22, "Short of length on the off stump driven on the Backfoot by Nissanka, one run"),
(4, 1, 4, 0, 2, 3, 22, "Dot Ball. Good Line and Length by Bumrah"),
(5, 1, 5, 6, 2, 3, 22, "SIX!. What a shot by Karunarathne! Bouncer by Bumrah, pulled infront of square for a massive six.");




-- -- Insert data into EXTRAINNINGS1 table
-- INSERT INTO EXTRAINNINGS1 (Ball_ID, Type, ExtraRuns) VALUES
-- (4, 'Leg Bye', 1),
-- (6, 'No Ball', 2);

-- -- Insert data into DISMISSALINNINGS1 table
-- INSERT INTO DISMISSALINNINGS1 (Ball_ID, DismissType, CaughtBy, FieldedBy, Dismissed) VALUES
-- (3, 'Run Out', NULL, 5, 1),
-- (6, 'Caught', 4, NULL, 2);


-- -- Insert data into INNINGS2 table
-- INSERT INTO INNINGS2 (Ball_ID, OverNum, BallNumber, RunsScored, OnStrikeID, NonStrikeID, CurrentBowlerID) VALUES
-- (1, 1, 1, 2, 2, 4, 1),
-- (2, 1, 2, 1, 2, 4, 1),
-- (3, 1, 3, 4, 2, 4, 2),
-- (4, 2, 1, 6, 4, 2, 5),
-- (5, 2, 2, 0, 4, 2, 5),
-- (6, 2, 3, 1, 4, 2, 5);
-- -- Insert data into EXTRAINNINGS2 table
-- INSERT INTO EXTRAINNINGS2 (Ball_ID, Type, ExtraRuns) VALUES
-- (1, 'No Ball', 2),
-- (5, 'Wide', 1);


-- -- Insert data into DISMISSALINNINGS2 table
-- INSERT INTO DISMISSALINNINGS2 (Ball_ID, DismissType, CaughtBy, FieldedBy, Dismissed) VALUES
-- (2, 'Caught', 5, NULL, 3),
-- (3, 'Bowled', NULL, NULL, 5);