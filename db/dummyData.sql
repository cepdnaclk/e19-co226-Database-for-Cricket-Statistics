INSERT INTO TEAM (TeamID, TeamName, Country, Coach, CaptainID)
VALUES
    (1, 'Sri Lanka', 'Sri Lanka', 'Chris Silverman', 1),
    (2, 'India', 'India', 'Rahul Dravid', 1);


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


INSERT INTO CURRENTMATCH (Team1_ID, Team2_ID, Date, Time, Venue, Toss, MatchName, TossIsBatting, MatchType)
VALUES
    (1, 2, '2023-08-02', '14:00:00', 'R. Premadasa Stadium', 2, "Final · Asia Cup 2023", 1, 2);


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


-- Insert data into INNINGS1 table
INSERT INTO INNINGS1 (Ball_ID, OverNum, BallNumber, RunsScored, OnStrikeID, NonStrikeID, CurrentBowlerID, Commentary) VALUES
(1, 0, 1, 4, 2, 3, 22, "Four!! First Ball of the Final of the Asia Cup 2023. Dimuth Karunathne on Strike. Juspreet Bumrah running in from the Lake End and strays on to the Pads of Karunathne who flicks it away to the mid-wicket boundary"),
(2, 0, 2, 1, 2, 3, 22, "Fuller One by Bumrash nudged away for a single"),
(3, 0, 3, 1, 3, 2, 22, "Short of length on the off stump driven on the Backfoot by Nissanka, one run"),
(4, 0, 4, 0, 2, 3, 22, "Dot Ball. Good Line and Length by Bumrah"),
(5, 0, 5, 6, 2, 3, 22, "SIX!. What a shot by Karunarathne! Bouncer by Bumrah, pulled infront of square for a massive six."),
(6, 0, 6, 2, 2, 3, 22, "Two Runs, again on the pads, flicked away to square leg to collect two runs. End of Over"),

(7, 1, 1, 0, 3, 2, 21, "Bowled! What a delivery by Thakur. Yorker Length, Nissanka completely bamboozeled! First Wicket for India as Pathum Nissanka walks back to the pavillion"),
(8, 1, 2, 2, 4, 2, 21, "Run Out! Two wickets in two balls. Comedic Running by the two batsmen, Mendis wanted the 3rd run. Dimuth did not respond. Sadly, for Sri Lanka Dimuth has to walk back to the pavillion after a quickfire 13 of 5 balls"),
(9, 1, 3, 6, 5, 4, 21, "Huge Six! What a shot by Asalanka on his very first ball. Down the track and over the bowlers head for a 97m six"),
(10,1, 4, 1, 5, 4 , 21, "Good Delivery, on a good length. Asalanka crosses over for a single, Mendis on Strike now"),
(11, 1, 5, 2, 4, 5, 21, "Another good delivery but a misfield resulted mendis to come back for a second"),
(12, 1, 6, 6, 4, 5, 21, "Sixer! Scooped over the fine leg fielder for a six. Sri Lanka manages to score 31 in their two overs! This would be an interesting run chase");




-- Insert data into EXTRAINNINGS1 table
INSERT INTO EXTRAINNINGS1 (Ball_ID, Type, ExtraRuns) VALUES

-- -- Insert data into DISMISSALINNINGS1 table
INSERT INTO DISMISSALINNINGS1 (Ball_ID, DismissType, CaughtBy, FieldedBy, Dismissed) VALUES
(7, 'Bowled', NULL, NULL, 3),
(8, 'runOut', NULL, 15, 2);



-- -- Insert data into INNINGS2 table
INSERT INTO INNINGS2 (Ball_ID, OverNum, BallNumber, RunsScored, OnStrikeID, NonStrikeID, CurrentBowlerID, Commentary) VALUES
(1, 0, 1, 4, 12, 13, 10,  "India starts off with a boundary. Kohli's trademark cover drive takes India to a great start. Nothing wrong with the delivery, pure class batting by Kohli"),
(2, 0, 2, 1, 12, 13, 10, "Batsman cross over for a single. Good ball by Madushanka aiming to hit the top of off stump. Rohit Sharma on Strike now."),
(3, 0, 3, 4, 13, 12, 10, "Pulled! over the mid-wicket fielder one bounce and goes to the boundary. What a start by Rohit Sharma"),
(4, 0, 4, 0, 13, 12, 10, "Bowled Him! Sharma yorked himself with this one. Down the track but completely missed the ball. One down for India"),
(5, 0, 5, 0, 14, 12, 10, "Caught in the deep! KL Rahul goes for a golden duck. Great bouncer by Madushanka"),
(6, 0, 6, 6, 15, 12, 10, "Hatrick ball hit for a humongous six over covers. What a shot by Dhawan. Definiltely the shot of the day. India only needs 17 in the last over"),


(7, 1, 1, 4, 12, 15, 7, "Four! Swept towards the fine leg boundary for four runs, the target comes down to 13 off 5"),
(8, 1, 2, 2, 12, 15, 7, "Two runs, well placed into the vacant extra cover boundary, Kohli comes back for two. Sri Lanka under tremendous pressure"),
(9, 1, 3, 0, 12, 15, 7, "OUT! Bowled him! Wrong'un by Hasaranga cleans up Virat Kohli! Sri Lanka on top. 11 off 3 balls needed for India"),
(10, 1, 4, 4, 16, 15, 7, "Boundary! What a final this is turning out to be! Straight down the ground by SKY one bounce and over the boundary line"),
(11, 1, 5, 2, 16, 15, 7, "Two runs. What a save by Asalanka on the mid-wicket boundary. It was definitely going for a boundary, but the dive saved 2 precious runs! Last ball 5 runs to win"),
(12, 1, 6, 3, 16, 15, 7, "Three runs! Sri Lanka wins!!! Dhawan couldn't manage to cross over the crease as Mendis whips the bails off. Great throw by Shanaka in the deep. Sri Lanka wins the Asia Cup 2023! The celebrations begin for the home team. They've been dominant throughout the tournament, and now holds their nerve to beat the mighty Indians in a thriller of a final. Thank You for joining with CricLive");


-- -- Insert data into EXTRAINNINGS2 table
-- INSERT INTO EXTRAINNINGS2 (Ball_ID, Type, ExtraRuns) VALUES
-- (1, 'No Ball', 2),
-- (5, 'Wide', 1);


-- -- Insert data into DISMISSALINNINGS2 table
INSERT INTO DISMISSALINNINGS2 (Ball_ID, DismissType, CaughtBy, FieldedBy, Dismissed) VALUES
(4, 'bowled', NULL, NULL, 13),
(5, 'caught', NULL, 8, 14),
(9, 'bowled', NULL, NULL, 12),
(12, 'runOut', 6,6, 15);