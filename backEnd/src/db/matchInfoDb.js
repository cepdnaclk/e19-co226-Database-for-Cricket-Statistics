const db = require("../../dbConfig/dbConfig")

const sql_matchDetails = "SELECT * FROM test";
const sql_teamDetails = "SELECT * FROM temp";

function getMatchInfo(res){
    db.query(sql_matchDetails,(err, data) => {
        console.log(err);
        res.status(200).json(data);
    });
}

function getTeamInfo(teamId, res){
    db.query(sql_teamDetails,(err, data) => {
        res.status(200).json(data);
    });
}

module.exports = {getMatchInfo, getTeamInfo};