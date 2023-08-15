// import modules
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const http = require("http");
const cors = require("cors");
const createSocket = require("./src/socket/socket");
const { instrument } = require("@socket.io/admin-ui");
const corsOptions = require("./src/config/corsOptions");

const https = require("https");
const fs = require("fs");

var path = require("path");
var key = fs.readFileSync(path.resolve(__dirname + "/selfsigned.key"));
var cert = fs.readFileSync(path.resolve(__dirname + "/selfsigned.crt"));
var options = {
  key: key,
  cert: cert,
};

// config port
const PORT = process.env.PORT || 5000;

// create app and server
const app = express();
var serverHttps = https.createServer(options, app);
const server = http.createServer(app);

// adding middlewears for app
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// socket config
const io = createSocket(serverHttps);
const mainController = require("./src/controller/mainController");
const matchInfo = require("./src/routes/matchInfo");
const comments = require("./src/routes/commentry");

// routing
app.use("/matchInfo", matchInfo);
app.use("/commentry", comments);

// // server
// server.listen(PORT, () => {
//   console.log("SERVER RUNNING");
// });

//httpsServer

serverHttps.listen(PORT, () => {
  console.log("server starting on port : " + PORT);
});

// trigger and send data
function intervalFunc() {
  mainController(io);
}
setInterval(intervalFunc, 2000);

instrument(io, {
  auth: false,
  mode: "development",
});
