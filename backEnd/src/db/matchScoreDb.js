const db = require("../../dbConfig/dbConfig")
const getStatus = require("../model/matchStatus");

const sql_getScoreWicketOver = "SELECT * FROM BALL";

function getScoreWicketOver(io, result, resultStatus){
    db.query(sql_getScoreWicketOver,(err, res) => {
        result(io, res);
        resultStatus(io, getStatus(res));
    });
}

module.exports = getScoreWicketOver;