const {connected, disconnected} = require("./connectDisconnect");
const topics = require("../util/topics");
const { Server } = require("socket.io");

function createSocket(server){

    // socket config
    const io = new Server(server, {
        cors: {
          origin: "https://criclive-frontend.onrender.com",
          methods: ["GET", "POST"],
          credentials:true
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