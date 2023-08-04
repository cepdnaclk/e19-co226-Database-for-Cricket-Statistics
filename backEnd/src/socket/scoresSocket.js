const topics = require("../util/topics");

function battingScoreSend(io, data1, data2){
    io.emit(topics.ONEBATTING, data1);
    io.emit(topics.TWOBATTING, data2);
}

function ballingScoreSend(io, data1, data2){
    io.emit(topics.ONEBALLING, data1);
    io.emit(topics.TWOBALLING, data2);
}


module.exports = {battingScoreSend, ballingScoreSend};
