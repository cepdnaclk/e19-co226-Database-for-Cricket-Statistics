const db = require("../../dbConfig/dbConfig")

const sql_matchDetails = "SELECT * FROM CURRENTMATCH";

const sql_teamDetails = `
select * from TEAM
Where TeamID = (Select Team1_ID from CURRENTMATCH)
UNION
select * from TEAM
Where TeamID = (Select Team2_ID from CURRENTMATCH);`;

const sql_playerDetails = "SELECT * FROM PLAYER INNER JOIN TEAMPLAYERS ON PLAYER.PlayerID = TEAMPLAYERS.PlayerID WHERE TeamID = ";

const sql_teamCaptain = "SELECT CaptainID FROM TEAM WHERE TeamID = ";

function getMatchInfo(res){
    db.query(sql_matchDetails,(err, data) => {
        res.status(200).json({
            // team1Id:data[0].Team1_ID,
            // team2Id:data[0].Team1_ID,
            date:data[0].Date,
            time:data[0].Time,
            venue:data[0].Venue,
            tossWinningTeamId:data[0].Toss,
            matchName:data[0].MatchName,
            tossIsBatting:(data[0].TossIsBatting===1)?true:false
        });
    });
}

function getTeamInfo(res){
    db.query(sql_teamDetails,(err, data) => {

        const teams = data.map(team => {
            return {
                teamId:team.TeamID,
                teamName:team.TeamName,
                country:team.Country,
                coach:team.Coach,
                captainId:team.CaptainID
            };
        });

        res.status(200).json(teams);
    });
}

function getPlayerInfo(teamId, res){
    db.query(sql_playerDetails + teamId,(err, players) => {
        db.query(sql_teamCaptain + teamId,(err, captainPlayer) => {
            const data = players.map(player => (player.PlayerID === captainPlayer[0].CaptainID) ? {captain:true, ...player}:{captain:false, ...player});
            
            const player = data.map(p => {
                return {
                    captain:p.captain,
                    playerId:p.PlayerID,
                    playerName:p.PlayerName,
                    playerType:p.PlayerType,
                    dateOfBirth:p.DateofBirth,
                    teamId:p.TeamID
                };
            });

            res.status(200).json(player);
        });
    });
}

module.exports = {getMatchInfo, getTeamInfo, getPlayerInfo};