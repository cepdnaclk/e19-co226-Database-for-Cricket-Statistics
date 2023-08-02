const db = require("../../dbConfig/dbConfig")

const sql_matchDetails = "";

function getMatchInfo(io, result){
    db.query(sql_matchDetails,(err, res) => {
        result(io, res);
    });
}

module.exports = getScoreWicketOver;