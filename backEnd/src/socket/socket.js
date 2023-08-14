const { connected, disconnected } = require("./connectDisconnect");
const topics = require("../util/topics");
const { Server } = require("socket.io");

function createSocket(server) {
  // socket config
  const io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:3000",
        "https://8814-103-247-51-108.ngrok-free.app",
      ],
      methods: ["GET", "POST"],
      credentials: true,
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
