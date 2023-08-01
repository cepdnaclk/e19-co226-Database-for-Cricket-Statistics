const db = require("../../dbConfig/dbConfig")

const sql_getScoreWicketOver = "";

function getScoreWicketOver(io, result){
    db.query(sql_getScoreWicketOver,(err, res) => {
        result(io, res);
    });
}

module.exports = getScoreWicketOver;