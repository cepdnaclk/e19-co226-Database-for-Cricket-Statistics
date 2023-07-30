const express = require("express");
const router = express.Router();
const playerController = require("../controller/playerController");

router.get("/", playerController.getAll);

module.exports = router;
