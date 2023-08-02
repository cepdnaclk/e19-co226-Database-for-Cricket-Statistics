// import modules
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const http = require("http");
const cors = require("cors");
const createSocket = require("./src/socket/socket");

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
const io = createSocket(server);
const mainController = require("./src/controller/mainController");
const matchInfo = require("./src/routes/matchInfo");

// routing
app.use("/matchInfo", matchInfo);


// server 
server.listen(PORT, () => {
  console.log("SERVER RUNNING");
});

// trigger and send data
function intervalFunc() {
  mainController(io);
  // console.log("Sending data...");
}
setInterval(intervalFunc, 1000);