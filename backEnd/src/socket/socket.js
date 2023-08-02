const {connected, disconnected} = require("./connectDisconnect");
const topics = require("../util/topics");
const { Server } = require("socket.io");

function createSocket(server){
    const io = new Server(server, {
        cors: {
          origin: "http://localhost:3000",
          methods: ["GET", "POST"],
        },
      });
      
      
      // socket
      io.on(topics.CONNECTION, (socket) => {
        connected(socket, io);
        disconnected(socket);
        
      });

      return io;
}

module.exports = createSocket;