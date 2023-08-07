const {matchScoreSend, matchStatus} = require("../socket/matchScoreSocket");
const {getBattingScore, getBallingScore} = require("../db/matchBattingBallingScoreDb");
const {getScoreWicketOver} = require("../db/matchScoreDb");
const newLocal = "../socket/matchBattingBallingSocket";
const {battingScoreSend1, ballingScoreSend1, battingScoreSend2, ballingScoreSend2}= require(newLocal);
const config = require("../db/configDb");

function main(io){
    // config();
    getScoreWicketOver(io, matchScoreSend, matchStatus);
    getBattingScore(io, battingScoreSend1, battingScoreSend2);
    getBallingScore(io, ballingScoreSend1, ballingScoreSend2);
}

module.exports = main;