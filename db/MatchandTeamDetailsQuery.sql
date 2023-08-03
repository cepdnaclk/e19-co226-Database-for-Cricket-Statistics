--get match details

--team names
select TeamName as Team1 from TEAM
Where TeamID = (Select Team1_ID from CURRENTMATCH);

select TeamName as Team2 from TEAM
Where TeamID = (Select Team2_ID from CURRENTMATCH);

--other details
Select Date, time, venue, MatchName from CURRENTMATCH;

--toss
Select TeamName as TossWon from TEAM
WHERE TeamID =(SELECT Toss from CURRENTMATCH);

--get team details

