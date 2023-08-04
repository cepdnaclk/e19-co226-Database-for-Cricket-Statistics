const {matchScoreSend, matchStatus} = require("../socket/matchScoreSocket");
const {getBattingScore, getBallingScore} = require("../db/matchBattingBallingScoreDb");
const {getScoreWicketOver} = require("../db/matchScoreDb");
const newLocal = "../socket/scoresSocket";
const {battingScoreSend, ballingScoreSend} = require(newLocal);
const config = require("../db/configDb");

function main(io){
    config();
    getScoreWicketOver(io, matchScoreSend, matchStatus);
    getBattingScore(io, battingScoreSend);
    getBallingScore(io, ballingScoreSend);
}

module.exports = main;