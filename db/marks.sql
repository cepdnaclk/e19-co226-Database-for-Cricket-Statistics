--total marks innings 1
SELECT SUM(TotalRuns) AS TotalRuns
FROM (
    SELECT SUM(RunsScored) AS TotalRuns FROM INNINGS1
    UNION ALL
    SELECT SUM(ExtraRuns) AS TotalRuns FROM EXTRAINNINGS1
) AS SubqueryAlias;

--total marks innings 2
SELECT SUM(TotalRuns) AS TotalRuns
FROM (
    SELECT SUM(RunsScored) AS TotalRuns FROM INNINGS2
    UNION ALL
    SELECT SUM(ExtraRuns) AS TotalRuns FROM EXTRAINNINGS2
) AS SubqueryAlias;

--wickets innings 1
SELECT COUNT(Ball_ID) FROM DISMISSALINNINGS1;

--wickets innings 2
SELECT COUNT(Ball_ID) FROM DISMISSALINNINGS2;

--overs, balls and onstriker and nonstriker, currentBowler
SELECT OverNum, BallNumber, OnStrikeID, NonStrikeID,CurrentBowlerID FROM INNINGS1 WHERE Ball_ID = (SELECT MAX(Ball_ID) FROM  INNINGS1);

--overs and balls innings 2
SELECT OverNum, BallNumber FROM INNINGS2 WHERE Ball_ID = (SELECT MAX(Ball_ID) FROM  INNINGS2);

--batsman scores
CREATE VIEW BatsmanScoresFirstInnings AS
SELECT 
    P.PlayerName,
    I1.OnStrikeID AS PlayerID,
    SUM(I1.RunsScored) AS TotalRuns,
    COUNT(CASE WHEN I1.RunsScored = 4 THEN 1 ELSE 0 END) AS '4s',
    COUNT(CASE WHEN I1.RunsScored = 6 THEN 1 ELSE 0 END) AS '6s',
    COUNT(Ball_ID) AS BallsFaced,
    0 AS IsOut
FROM INNINGS1 AS I1
INNER JOIN PLAYER AS P ON I1.OnStrikeID = P.PlayerID
GROUP BY P.PlayerName, I1.OnStrikeID;



CREATE VIEW BatsmanScoresSecondInnings AS
SELECT 
    P.PlayerName,
    I2.OnStrikeID AS PlayerID,
    SUM(I2.RunsScored) AS TotalRuns,
    COUNT(CASE WHEN I2.RunsScored = 4 THEN 1 ELSE 0 END) AS '4s',
    COUNT(CASE WHEN I2.RunsScored = 6 THEN 1 ELSE 0 END) AS '6s',
    COUNT(Ball_ID) AS BallsFaced,
    0 AS IsOut
FROM INNINGS2 AS I2
INNER JOIN PLAYER AS P ON I2.OnStrikeID = P.PlayerID
GROUP BY P.PlayerName, I2.OnStrikeID;

-- isout, how out

DELIMITER //

CREATE TRIGGER PlayerOut
AFTER INSERT ON DISMISSALINNINGS1 
FOR EACH ROW
BEGIN 
    UPDATE BatsmanScoresFirstInnings SET IsOut = 1 WHERE PlayerID = NEW.Dismissed;
END;
//

DELIMITER ;
------------------------------ same procedure as the above trigger but does not trigger automatically
DELIMITER //

CREATE PROCEDURE UpdateBatsmanIsOut(IN dismissedPlayerID INT)
BEGIN
    UPDATE BatsmanScores
    SET IsOut = 1
    WHERE PlayerID = dismissedPlayerID;
END;

//

DELIMITER ;

--get how out procedure
DELIMITER //

CREATE PROCEDURE getHowOut(IN dismissedPlayerID INT)
BEGIN
    SELECT DismissType FROM DISMISSALINNINGS1 WHERE Dismissed = dismissedPlayerID;
END;

//

DELIMITER ;

--call procedure 
CALL getHowOut(dismissedPlayerID);

-- get fielder + bowler for caught out
CREATE PROCEDURE getCaughtOut(IN dismissedPlayerID INT)
BEGIN 
    SELECT 
        (SELECT PlayerName FROM PLAYER 
         INNER JOIN DISMISSALINNINGS1 ON PLAYER.PlayerID = DISMISSALINNINGS1.CaughtBy 
         WHERE Dismissed = dismissedPlayerID) AS caughtBy,
        
        (SELECT PlayerName FROM PLAYER 
         WHERE PlayerID = (SELECT CurrentBowlerID 
                          FROM INNINGS1 
                          WHERE Ball_ID = (SELECT Ball_ID FROM DISMISSALINNINGS1 WHERE Dismissed = dismissedPlayerID))) AS bowled;
END;

//

DELIMITER ;

--get bowler name
CREATE PROCEDURE getBowler(IN dismissedPlayerID INT)
BEGIN
    SELECT
        (SELECT PlayerName FROM PLAYER 
         WHERE PlayerID = (SELECT CurrentBowlerID 
                          FROM INNINGS1 
                          WHERE Ball_ID = (SELECT Ball_ID FROM DISMISSALINNINGS1 WHERE Dismissed = dismissedPlayerID))) AS bowled;
END;
 

---get Bowling figures returns name, id, runs, numberof wickets and balls faced
--- view for bowling

---
CREATE VIEW BowlingFiguresViewfirst AS
SELECT
    P.PlayerName,
    P.PlayerID,
    IFNULL(TR.TotalRuns, 0) AS TotalRuns,
    IFNULL(NW.numberOfWickets, 0) AS NumberOfWickets,
    IFNULL(BF.ballsFaced, 0) AS BallsFaced,
    IFNULL(MaidenOvers, 0) AS MaidenOvers
FROM PLAYER P
INNER JOIN (
    SELECT
        CurrentBowlerID,
        SUM(TotalRuns) AS TotalRuns
    FROM (
        SELECT CurrentBowlerID, SUM(RunsScored) AS TotalRuns FROM INNINGS1 GROUP BY CurrentBowlerID
        UNION ALL
        SELECT I1.CurrentBowlerID, SUM(ExtraRuns) AS TotalRuns
        FROM EXTRAINNINGS1 E1
        INNER JOIN INNINGS1 I1 ON E1.Ball_ID = I1.Ball_ID 
        GROUP BY I1.CurrentBowlerID
    ) AS SubqueryAlias
    GROUP BY CurrentBowlerID
) AS TR ON P.PlayerID = TR.CurrentBowlerID
LEFT JOIN (
    SELECT
        CurrentBowlerID,
        COUNT(Ball_ID) AS numberOfWickets
    FROM INNINGS1
    WHERE Ball_ID IN (SELECT Ball_ID FROM DISMISSALINNINGS1)
    GROUP BY CurrentBowlerID
) AS NW ON P.PlayerID = NW.CurrentBowlerID
LEFT JOIN (
    SELECT
        CurrentBowlerID,
        COUNT(Ball_ID) AS ballsFaced
    FROM INNINGS1
    GROUP BY CurrentBowlerID
) AS BF ON P.PlayerID = BF.CurrentBowlerID
LEFT JOIN (
    SELECT
        CurrentBowlerID,
        COUNT(DISTINCT Over) AS MaidenOvers
    FROM INNINGS1
    WHERE RunsScored = 0
    GROUP BY CurrentBowlerID
) AS MO ON P.PlayerID = MO.CurrentBowlerID;


CREATE VIEW BowlingFiguresViewsecond AS
SELECT
    P.PlayerName,
    P.PlayerID,
    IFNULL(TR.TotalRuns, 0) AS TotalRuns,
    IFNULL(NW.numberOfWickets, 0) AS NumberOfWickets,
    IFNULL(BF.ballsFaced, 0) AS BallsFaced
FROM PLAYER P
INNER JOIN (
    SELECT
        CurrentBowlerID,
        SUM(TotalRuns) AS TotalRuns
    FROM (
        SELECT CurrentBowlerID, SUM(RunsScored) AS TotalRuns FROM INNINGS2 GROUP BY CurrentBowlerID
        UNION ALL
        SELECT I1.CurrentBowlerID, SUM(ExtraRuns) AS TotalRuns
        FROM EXTRAINNINGS2 E1
        INNER JOIN INNINGS2 I1 ON E1.Ball_ID = I1.Ball_ID
        GROUP BY I1.CurrentBowlerID
    ) AS SubqueryAlias
    GROUP BY CurrentBowlerID
) AS TR ON P.PlayerID = TR.CurrentBowlerID
LEFT JOIN (
    SELECT
        CurrentBowlerID,
        COUNT(Ball_ID) AS numberOfWickets
    FROM INNINGS1
    WHERE Ball_ID NOT IN (SELECT Ball_ID FROM DISMISSALINNINGS2 WHERE DismissType = 'runOut')
    GROUP BY CurrentBowlerID
) AS NW ON P.PlayerID = NW.CurrentBowlerID
LEFT JOIN (
    SELECT
        CurrentBowlerID,
        COUNT(Ball_ID) AS ballsFaced
    FROM INNINGS1
    GROUP BY CurrentBowlerID
) AS BF ON P.PlayerID = BF.CurrentBowlerID;


