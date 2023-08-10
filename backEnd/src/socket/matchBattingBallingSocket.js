const topics = require("../util/topics");

function battingScoreSend1(io, data){
    io.emit(topics.ONEBATTING, data);
}

function battingScoreSend2(io, data){
    io.emit(topics.TWOBATTING, data);
}

function ballingScoreSend1(io, data){
    io.emit(topics.ONEBALLING, data);
}

function ballingScoreSend2(io, data){
    io.emit(topics.TWOBALLING, data);
}



module.exports = {battingScoreSend1, ballingScoreSend1, battingScoreSend2, ballingScoreSend2};