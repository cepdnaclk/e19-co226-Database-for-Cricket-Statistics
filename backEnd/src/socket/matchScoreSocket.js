const topics = require("../util/topics");

function matchScoreSend(io, data){
    io.emit(topics.MATCHSCORE, data);
}

function matchStatus(io, data){
    io.emit(topics.MATCHSTATUS, data);
}

function matchExtra(io, data){
    io.emit(topics.EXTRA, data);
}

function matchPlaying(io, data){
    io.emit(topics.PLAYINGTEAM, data);
}

module.exports = {matchScoreSend, matchStatus, matchExtra, matchPlaying};