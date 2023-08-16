const { connected, disconnected } = require("./connectDisconnect");
const topics = require("../util/topics");
const { Server } = require("socket.io");

function createSocket(server) {
  // socket config
  const io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:3000",
        "http://10.30.7.70:3000",
        "http://10.40.18.143:3000",
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
