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
        COUNT(Ball_ID) AS numberOfWickets
    FROM INNINGS1
    WHERE Ball_ID IN (SELECT Ball_ID FROM DISMISSALINNINGS1)
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
        COUNT(Ball_ID) AS numberOfWickets
    FROM INNINGS2
    WHERE Ball_ID NOT IN (SELECT Ball_ID FROM DISMISSALINNINGS2 WHERE DismissType = 'runOut')
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


-- What was on Kaushitha's local bowlingviewssecond view query
select `p`.`PlayerName` AS `PlayerName`,`p`.`PlayerID` AS `PlayerID`,ifnull(`tr`.`TotalRuns`,0) AS `TotalRuns`,ifnull(`nw`.`numberOfWickets`,0) AS `NumberOfWickets`,ifnull(`bf`.`ballsBowled`,0) AS `ballsBowled`,ifnull(`mo`.`MaidenOvers`,0) AS `MaidenOvers` from ((((`criclive`.`player` `p` join (select `subqueryalias`.`CurrentBowlerID` AS `CurrentBowlerID`,sum(`subqueryalias`.`TotalRuns`) AS `TotalRuns` from (select `criclive`.`innings2`.`CurrentBowlerID` AS `CurrentBowlerID`,sum(`criclive`.`innings2`.`RunsScored`) AS `TotalRuns` from `criclive`.`innings2` group by `criclive`.`innings2`.`CurrentBowlerID` union all select `i1`.`CurrentBowlerID` AS `CurrentBowlerID`,sum(`e1`.`ExtraRuns`) AS `TotalRuns` from (`criclive`.`extrainnings2` `e1` join `criclive`.`innings2` `i1` on(`e1`.`Ball_ID` = `i1`.`Ball_ID`)) group by `i1`.`CurrentBowlerID`) `subqueryalias` group by `subqueryalias`.`CurrentBowlerID`) `tr` on(`p`.`PlayerID` = `tr`.`CurrentBowlerID`)) left join (select `criclive`.`innings1`.`CurrentBowlerID` AS `CurrentBowlerID`,count(`criclive`.`innings1`.`Ball_ID`) AS `numberOfWickets` from `criclive`.`innings1` where !(`criclive`.`innings1`.`Ball_ID` in (select `criclive`.`dismissalinnings2`.`Ball_ID` from `criclive`.`dismissalinnings2` where `criclive`.`dismissalinnings2`.`DismissType` = 'runOut')) group by `criclive`.`innings1`.`CurrentBowlerID`) `nw` on(`p`.`PlayerID` = `nw`.`CurrentBowlerID`)) left join (select `criclive`.`innings1`.`CurrentBowlerID` AS `CurrentBowlerID`,count(case when !(`criclive`.`innings1`.`Ball_ID` in (select `criclive`.`extrainnings2`.`Ball_ID` from `criclive`.`extrainnings2` where `criclive`.`extrainnings2`.`Type` = 'byes' or `criclive`.`extrainnings2`.`Type` = 'legByes')) then `criclive`.`innings1`.`Ball_ID` else NULL end) AS `ballsBowled` from `criclive`.`innings1` group by `criclive`.`innings1`.`CurrentBowlerID`) `bf` on(`p`.`PlayerID` = `bf`.`CurrentBowlerID`)) left join (select `criclive`.`innings2`.`CurrentBowlerID` AS `CurrentBowlerID`,count(distinct `criclive`.`innings2`.`OverNum`) AS `MaidenOvers` from `criclive`.`innings2` where !exists(select 1 from `criclive`.`innings2` `i` where `i`.`CurrentBowlerID` = `criclive`.`innings2`.`CurrentBowlerID` and `i`.`OverNum` = `criclive`.`innings2`.`OverNum` and `i`.`RunsScored` > 0 limit 1) and !(`criclive`.`innings2`.`Ball_ID` in (select `criclive`.`extrainnings2`.`Ball_ID` from `criclive`.`extrainnings2` union select `criclive`.`dismissalinnings2`.`Ball_ID` from `criclive`.`dismissalinnings2`)) group by `criclive`.`innings2`.`CurrentBowlerID`) `mo` on(`p`.`PlayerID` = `mo`.`CurrentBowlerID`))