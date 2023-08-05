const topics = require("../util/topics");

function matchScoreSend(io, data){
    io.emit(topics.MATCHSCORE, data);
}

function matchStatus(io, data){
    io.emit(topics.MATCHSTATUS, data);
}


module.exports = {matchScoreSend, matchStatus};