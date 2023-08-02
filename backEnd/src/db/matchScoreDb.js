const db = require("../../dbConfig/dbConfig")

const sql_getScoreWicketOver = "SELECT * FROM BALL";

function getScoreWicketOver(io, result){
    db.query(sql_getScoreWicketOver,(err, res) => {
        console.log(res);
        result(io, res);
    });
}

module.exports = getScoreWicketOver;