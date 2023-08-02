const express = require("express");
const router = express.Router();
const {getMatchInfo, getTeamInfo} = require("../db/matchInfoDb");

router.get("/", async (req, res) => {
    getMatchInfo(res);
});

router.post("/teams", async (req, res) => {
    const {teamId} = req.body;
    getTeamInfo(teamId ,res);
});
  
module.exports = router;