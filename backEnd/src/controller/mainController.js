const matchScoreSend = require("../socket/matchScoreSocket");
const getScoreWicketOver = require("../db/matchScoreDb");

function main(io){
    getScoreWicketOver(io, matchScoreSend);
}

module.exports = main;