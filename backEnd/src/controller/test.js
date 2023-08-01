const testSend = require("../socket/test");
const getData = require("../db/test");

function testRun(io){
    getData(io, testSend);
}

module.exports = testRun;