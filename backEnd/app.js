// import modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();

// get routes
const playerRoute = require("./src/routes/playerRoute");
// port
const PORT = process.env.PORT || 5000;

// adding middlewears
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// adding routes
app.use("/player", playerRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
