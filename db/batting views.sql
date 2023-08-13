CREATE VIEW BatsmanScoresFirstInnings AS
SELECT 
    P.PlayerName,
    I1.OnStrikeID AS PlayerID,
    SUM(I1.RunsScored) AS TotalRuns,
    COUNT(CASE WHEN I1.RunsScored = 4 THEN Ball_ID ELSE NULL END) AS fours,
    COUNT(CASE WHEN I1.RunsScored = 6 THEN Ball_ID ELSE NULL END) AS sixes,
    COUNT(Ball_ID) AS BallsFaced,
    (CASE WHEN OnStrikeID IN(SELECT Dismissed FROM DISMISSALINNINGS1) THEN 1 ELSE 0 END) AS IsOut,
    (CASE WHEN OnStrikeID IN(SELECT Dismissed FROM DISMISSALINNINGS1) 
     	THEN (SELECT DismissType FROM DISMISSALINNINGS1 
              WHERE I1.OnStrikeID = DISMISSALINNINGS1.Dismissed) ELSE NULL END) AS howOut,
    (CASE WHEN OnStrikeID IN(SELECT Dismissed FROM DISMISSALINNINGS1)
        THEN (SELECT PlayerName FROM PLAYER 
            INNER JOIN DISMISSALINNINGS1 ON PLAYER.PlayerID = DISMISSALINNINGS1.CaughtBy 
            WHERE Dismissed = I1.OnStrikeID)ELSE NULL END) AS caughtBy,
    (CASE WHEN OnStrikeID IN(SELECT Dismissed FROM DISMISSALINNINGS1)
        THEN (SELECT PlayerName FROM PLAYER 
            INNER JOIN DISMISSALINNINGS1 ON PLAYER.PlayerID = DISMISSALINNINGS1.FieldedBy 
            WHERE Dismissed = I1.OnStrikeID)ELSE NULL END) AS fieldedBy,
    (CASE WHEN OnStrikeID IN(SELECT Dismissed FROM DISMISSALINNINGS1)
        THEN (SELECT PlayerName FROM PLAYER 
            WHERE PlayerID = (SELECT CurrentBowlerID 
                          FROM INNINGS1 
                          WHERE Ball_ID = (SELECT Ball_ID FROM DISMISSALINNINGS1 
                                           WHERE I1.OnStrikeID = DISMISSALINNINGS1.Dismissed))) ELSE NULL END) AS bowled
FROM INNINGS1 AS I1
INNER JOIN PLAYER AS P ON I1.OnStrikeID = P.PlayerID
GROUP BY P.PlayerName, I1.OnStrikeID;


CREATE VIEW BatsmanScoresSecondInnings AS
SELECT 
    P.PlayerName,
    I2.OnStrikeID AS PlayerID,
    SUM(I2.RunsScored) AS TotalRuns,
    COUNT(CASE WHEN I2.RunsScored = 4 THEN Ball_ID ELSE NULL END) AS fours,
    COUNT(CASE WHEN I2.RunsScored = 6 THEN Ball_ID ELSE NULL END) AS sixes,
    COUNT(Ball_ID) AS BallsFaced,
    (CASE WHEN OnStrikeID IN(SELECT Dismissed FROM DISMISSALINNINGS2) THEN 1 ELSE 0 END) AS IsOut,
    (CASE WHEN OnStrikeID IN(SELECT Dismissed FROM DISMISSALINNINGS2) 
     	THEN (SELECT DismissType FROM DISMISSALINNINGS2 
              WHERE I2.OnStrikeID = DISMISSALINNINGS2.Dismissed) ELSE NULL END) AS howOut,
    (CASE WHEN OnStrikeID IN(SELECT Dismissed FROM DISMISSALINNINGS2)
        THEN (SELECT PlayerName FROM PLAYER 
            INNER JOIN DISMISSALINNINGS2 ON PLAYER.PlayerID = DISMISSALINNINGS2.CaughtBy 
            WHERE Dismissed = I2.OnStrikeID)ELSE NULL END) AS caughtBy,
    (CASE WHEN OnStrikeID IN(SELECT Dismissed FROM DISMISSALINNINGS2)
        THEN (SELECT PlayerName FROM PLAYER 
            INNER JOIN DISMISSALINNINGS2 ON PLAYER.PlayerID = DISMISSALINNINGS2.FieldedBy 
            WHERE Dismissed = I2.OnStrikeID)ELSE NULL END) AS fieldedBy,
    (CASE WHEN OnStrikeID IN(SELECT Dismissed FROM DISMISSALINNINGS2)
        THEN (SELECT PlayerName FROM PLAYER 
            WHERE PlayerID = (SELECT CurrentBowlerID 
                          FROM INNINGS2 
                          WHERE Ball_ID = (SELECT Ball_ID FROM DISMISSALINNINGS2 
                                           WHERE I2.OnStrikeID = DISMISSALINNINGS2.Dismissed))) ELSE NULL END) AS bowled
FROM INNINGS2 AS I2
INNER JOIN PLAYER AS P ON I2.OnStrikeID = P.PlayerID
GROUP BY P.PlayerName, I2.OnStrikeID;


CREATE VIEW BowlingFiguresViewfirst AS
SELECT
    P.PlayerName,
    P.PlayerID,
    IFNULL(TR.TotalRuns, 0) AS TotalRuns,
    IFNULL(NW.numberOfWickets, 0) AS NumberOfWickets,
    IFNULL(BF.ballsBowled, 0) AS ballsBowled,
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
        COUNT(DISMISSALINNINGS1.Ball_ID) AS numberOfWickets
    FROM DISMISSALINNINGS1
    INNER JOIN INNINGS1 ON INNINGS1.Ball_ID = DISMISSALINNINGS1.Ball_ID
    WHERE DismissType !='runOut'
    GROUP BY CurrentBowlerID
) AS NW ON P.PlayerID = NW.CurrentBowlerID
LEFT JOIN (
    SELECT
        CurrentBowlerID,
        COUNT(CASE WHEN Ball_ID NOT IN (SELECT Ball_ID FROM EXTRAINNINGS1 
                                    WHERE Type = 'byes' OR Type = 'legByes') 
                                    THEN Ball_ID 
                                    ELSE NULL END) AS ballsBowled
    FROM INNINGS1
    GROUP BY CurrentBowlerID
) AS BF ON P.PlayerID = BF.CurrentBowlerID
LEFT JOIN (
    SELECT
        CurrentBowlerID,
        COUNT(DISTINCT OverNum) AS MaidenOvers
    FROM INNINGS1
    WHERE NOT EXISTS (
        SELECT 1
        FROM INNINGS1 AS I
        WHERE I.CurrentBowlerID = INNINGS1.CurrentBowlerID
          AND I.OverNum = INNINGS1.OverNum
          AND I.RunsScored > 0
    ) AND Ball_ID NOT IN (SELECT Ball_ID FROM EXTRAINNINGS1 UNION SELECT Ball_ID FROM DISMISSALINNINGS1)
    GROUP BY CurrentBowlerID
) AS MO ON P.PlayerID = MO.CurrentBowlerID;


CREATE VIEW BowlingFiguresViewsecond AS
SELECT
    P.PlayerName,
    P.PlayerID,
    IFNULL(TR.TotalRuns, 0) AS TotalRuns,
    IFNULL(NW.numberOfWickets, 0) AS NumberOfWickets,
    IFNULL(BF.ballsBowled, 0) AS ballsBowled,
    IFNULL(MaidenOvers, 0) AS MaidenOvers
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
        COUNT(DISMISSALINNINGS2.Ball_ID) AS numberOfWickets
    FROM DISMISSALINNINGS2
    INNER JOIN INNINGS2 ON INNINGS2.Ball_ID = DISMISSALINNINGS2.Ball_ID
    WHERE DismissType !='runOut'
    GROUP BY CurrentBowlerID
) AS NW ON P.PlayerID = NW.CurrentBowlerID
LEFT JOIN (
    SELECT
        CurrentBowlerID,
        COUNT(CASE WHEN Ball_ID NOT IN (SELECT Ball_ID FROM EXTRAINNINGS2 
                                    WHERE Type = 'byes' OR Type = 'legByes') 
                                    THEN Ball_ID 
                                    ELSE NULL END) AS ballsBowled
    FROM INNINGS2
    GROUP BY CurrentBowlerID
) AS BF ON P.PlayerID = BF.CurrentBowlerID
LEFT JOIN (
    SELECT
        CurrentBowlerID,
        COUNT(DISTINCT OverNum) AS MaidenOvers
    FROM INNINGS2
    WHERE NOT EXISTS (
        SELECT 1
        FROM INNINGS2 AS I
        WHERE I.CurrentBowlerID = INNINGS2.CurrentBowlerID
          AND I.OverNum = INNINGS2.OverNum
          AND I.RunsScored > 0
    ) AND Ball_ID NOT IN (SELECT Ball_ID FROM EXTRAINNINGS2 UNION SELECT Ball_ID FROM DISMISSALINNINGS2)
    GROUP BY CurrentBowlerID
) AS MO ON P.PlayerID = MO.CurrentBowlerID;



