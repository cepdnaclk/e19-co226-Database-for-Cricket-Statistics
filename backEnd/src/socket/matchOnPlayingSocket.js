const topics = require("../util/topics");

function matchOnPlaying(io, data){
    io.emit(topics.ONPLAYING, data);
}