const topics = require("../util/topics");

function battingScoreSend(io, data){
    io.emit(topics.BATTING, data);
}

function ballingScoreSend(io, data){
    io.emit(topics.BALLING, data);
}

module.exports = {battingScoreSend, ballingScoreSend};

