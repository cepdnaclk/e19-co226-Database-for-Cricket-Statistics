// import modules
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

// config port
const PORT = process.env.PORT || 5000;

// create app and server
const app = express();
const server = http.createServer(app);

// adding middlewears for app
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// socket config
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// import socket functions
const {connected, disconnected} = require("./src/socket/connectDisconnect");

// socket
io.on("connection", (socket) => {

  connected(socket);
  disconnected(socket);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

});

// server 
server.listen(PORT, () => {
    console.log("SERVER RUNNING");
});