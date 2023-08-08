const express = require("express");
const router = express.Router();
const getCommentry = require("../db/commentryDb");

router.get("/", async (req, res) => {
    getCommentry(res);
});

module.exports = router;