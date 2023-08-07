--get match details

--team names
select TeamName as Team1 from TEAM
Where TeamID = (Select Team1_ID from CURRENTMATCH);

select * from TEAM
Where TeamID = (Select Team1_ID from CURRENTMATCH);

select TeamName as Team2 from TEAM
Where TeamID = (Select Team2_ID from CURRENTMATCH);

select * from TEAM
Where TeamID = (Select Team2_ID from CURRENTMATCH);

--other details
Select Date, time, venue, MatchName from CURRENTMATCH;

--toss
Select TeamName as TossWon from TEAM
WHERE TeamID =(SELECT Toss from CURRENTMATCH);

SELECT TossIsBatting FROM CURRENTMATCH;

--view to show match details
CREATE VIEW MatchDetails AS
SELECT
    (SELECT TeamName FROM TEAM WHERE TeamID = (SELECT Team1_ID FROM CURRENTMATCH)) AS Team1,
    (SELECT TeamName FROM TEAM WHERE TeamID = (SELECT Team2_ID FROM CURRENTMATCH)) AS Team2,
    CM.Date,
    CM.Time,
    CM.Venue,
    CM.MatchName,
    (SELECT TeamName FROM TEAM WHERE TeamID = (SELECT Toss FROM CURRENTMATCH)) AS TossWon,
    CM.TossIsBatting
FROM CURRENTMATCH AS CM;

SELECT * FROM MatchDetails;

--get team details
--team 1
SELECT PlayerName FROM PLAYER
INNER JOIN TEAMPLAYERS ON PLAYER.PlayerID = TEAMPLAYERS.PlayerID
WHERE TEAMPLAYERS.TeamID = (SELECT Team1_ID FROM CURRENTMATCH);
--captain
SELECT PlayerName as Captain from PLAYER
WHERE PlayerID = (  SELECT CaptainID from TEAM 
                    WHERE TeamID = (SELECT Team1_ID FROM CURRENTMATCH));

--team 2
SELECT PlayerName FROM PLAYER
INNER JOIN TEAMPLAYERS ON PLAYER.PlayerID = TEAMPLAYERS.PlayerID
WHERE TEAMPLAYERS.TeamID = (SELECT Team2_ID FROM CURRENTMATCH);

--captain
SELECT PlayerName as Captain from PLAYER
WHERE PlayerID = (  SELECT CaptainID from TEAM 
                    WHERE TeamID = (SELECT Team2_ID FROM CURRENTMATCH));


