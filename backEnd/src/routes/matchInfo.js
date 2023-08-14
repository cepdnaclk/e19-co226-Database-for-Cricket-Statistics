const express = require("express");
const router = express.Router();
const {
  getMatchInfo,
  getTeamInfo,
  getPlayerInfo,
} = require("../db/matchInfoDb");
const cors = require("cors");
express.use(cors());
router.get("/", async (req, res) => {
  getMatchInfo(res);
});

router.get("/teams", async (req, res) => {
  getTeamInfo(res);
});

router.post("/teams", async (req, res) => {
  const { teamId } = req.body;
  getPlayerInfo(teamId, res);
});

router.get("/teams/details", async (req, res) => {
  const teamId = req.query.teamId;
  getPlayerInfo(teamId, res);
});

module.exports = router;
