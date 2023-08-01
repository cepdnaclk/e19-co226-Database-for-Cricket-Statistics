function testSend(io, data){
    io.emit("test", data)
}

module.exports = testSend;