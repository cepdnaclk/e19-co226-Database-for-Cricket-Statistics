const db = require("../../dbConfig/dbConfig")
const {batting, balling} = require("../model/score");

const sql_batting = "SELECT * FROM BALL";
const sql_balling = "SELECT * FROM BALL";

function getBattingScore(io, result){
    db.query(sql_batting,(err, one) => {
        db.query(sql_batting,(err, two) => {
            result(io, batting(one), batting(two));
        });
    });
}

function getBallingScore(io, result){
    db.query(sql_balling,(err, one) => {
        db.query(sql_balling,(err, two) => {
            result(io, balling(one), balling(two));
        });
    });
}

module.exports = {getBattingScore, getBallingScore};