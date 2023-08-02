const db = require("../../dbConfig/dbConfig")
const {batting, balling} = require("../model/score");

const sql_batting = "SELECT * FROM BALL";
const sql_balling = "SELECT * FROM BALL";

function getBattingScore(io, result){
    db.query(sql_batting,(err, res) => {
        result(io, batting(res));
    });
}

function getBallingScore(io, result){
    db.query(sql_balling,(err, res) => {
        result(io, balling(res));
    });
}

module.exports = {getBattingScore, getBallingScore};