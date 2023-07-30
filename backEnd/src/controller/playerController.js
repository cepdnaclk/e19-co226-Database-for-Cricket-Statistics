let Player = require("../model/player");

exports.getAll = (req, res) => {
  Player.getAll((player) => {
    res.send(player);
  });
};
