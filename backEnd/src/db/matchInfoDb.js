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
        res.status(200).json(data[0]);
    });
}

function getTeamInfo(res){
    db.query(sql_teamDetails,(err, data) => {
        res.status(200).json(data);
    });
}

function getPlayerInfo(teamId, res){

    db.query(sql_playerDetails + teamId,(err, players) => {
        db.query(sql_teamCaptain + teamId,(err, captainPlayer) => {
            data = players.map(player => (player.PlayerID === captainPlayer[0].CaptainID) ? {captain:true, ...player}:{captain:false, ...player});
            res.status(200).json(data);
        });
    });
}

module.exports = {getMatchInfo, getTeamInfo, getPlayerInfo};