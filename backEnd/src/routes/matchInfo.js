const express = require("express");
const router = express.Router();
const {getMatchInfo, getTeamInfo, getPlayerInfo} = require("../db/matchInfoDb");

router.get("/", async (req, res) => {
    getMatchInfo(res);
});

router.post("/teams", async (req, res) => {
    const {teamId} = req.body;
    getPlayerInfo(teamId ,res);
});

router.get("/teams", async (req, res) => {
    getTeamInfo(res);
});
  
module.exports = router;