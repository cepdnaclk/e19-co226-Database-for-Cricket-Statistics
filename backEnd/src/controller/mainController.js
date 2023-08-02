const {matchScoreSend, matchStatus} = require("../socket/matchScoreSocket");
const {getBattingScore, getBallingScore} = require("../db/scoreDb");
const getScoreWicketOver = require("../db/matchScoreDb");
const newLocal = "../socket/scoresSocket";
const {battingScoreSend, ballingScoreSend} = require(newLocal);

function main(io){
    getScoreWicketOver(io, matchScoreSend, matchStatus);
    getBattingScore(io, battingScoreSend);
    getBallingScore(io, ballingScoreSend);
}

module.exports = main;