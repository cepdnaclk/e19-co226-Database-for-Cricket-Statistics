var db = require("../../dbConfig/dbConfig");

class Player {
  constructor(player) {
    this.plyerID = player.plyerID;
    this.type = player.type;
    this.country = player.country;
    this.dateOfBirth = player.dateOfBirth;
    this.name = player.Name;

    var today = new Date();
    var birthDate = new Date(player.dateOfBirth);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    this.age = age;
  }
}

Player.getAll = function (result) {
  db.query("SELECT * FROM student", (err, res) => {
    result(res.map((element) => new Player(element)));
  });
};

module.exports = Player;
