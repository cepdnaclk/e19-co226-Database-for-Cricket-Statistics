const topics = require("../util/topics");

function matchScoreSend(io, data){
    io.emit(topics.MATCHSCORE, data)
}

module.exports = matchScoreSend;