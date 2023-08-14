const express = require("express");
const router = express.Router();
const getCommentry = require("../db/commentryDb");
const cors = require("cors");
express.use(cors());
router.get("/", async (req, res) => {
  getCommentry(res);
});

module.exports = router;
