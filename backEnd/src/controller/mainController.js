const {matchScoreSend, matchStatus, matchExtra, matchPlaying} = require("../socket/matchScoreSocket");
const {getBattingScore, getBallingScore} = require("../db/scoreDb");
const {getScoreWicketOver, getExtra, getPlayingTeam} = require("../db/matchScoreDb");
const newLocal = "../socket/scoresSocket";
const {battingScoreSend, ballingScoreSend} = require(newLocal);

function main(io){
    getScoreWicketOver(io, matchScoreSend, matchStatus);
    getBattingScore(io, battingScoreSend);
    getBallingScore(io, ballingScoreSend);
    getExtra(io, matchExtra);
    getPlayingTeam(io, matchPlaying);
}

module.exports = main;