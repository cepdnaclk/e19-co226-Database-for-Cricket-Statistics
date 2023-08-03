const db = require("../../dbConfig/dbConfig")
const getStatus = require("../model/matchStatus");

const sql_getScoreWicketOver = "SELECT * FROM BALL";
const sql_getExtra = "";
const sql_getPlayingTeam = "";

function getScoreWicketOver(io, result, resultStatus){
    db.query(sql_getScoreWicketOver,(err, res) => {
        result(io, res);
        resultStatus(io, getStatus(res));
    });
}

function getExtra(io, result){
    db.query(sql_getExtra,(err, res) => {
        result(io, res);
    });
}

function getPlayingTeam(io, result){
    db.query(sql_getPlayingTeam,(err, res) => {
        result(io, res);
    });
}

module.exports = {getScoreWicketOver, getExtra, getPlayingTeam};