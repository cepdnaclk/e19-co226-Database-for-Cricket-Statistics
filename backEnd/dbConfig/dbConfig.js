const mysql = require("mysql");

//local mysql db connection

// const dbConn = mysql.createConnection({
//   host: "bzg2gtr1s18vgce364iy-mysql.services.clever-cloud.com",
//   user: "uvsdiey20opi9xq9",
//   password: "YFiru8Xlt4w95XIoMeJi",
//   database: "bzg2gtr1s18vgce364iy",
// });

const dbConn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "criclive",
});

// const dbConn = mysql.createConnection({
//   host: "dpg-cjbm11fdb61s739teq4g-a",
//   user: "user",
//   password: "k4KlygdqZb8ppbwcrnllQwqUuarDs1HE",
//   database: "test_7ls7",
// });

// connect db
dbConn.connect(function (err) {
  if (err) throw err;
  console.log("Database Connected!");
});

module.exports = dbConn;

//Database for different match instances\
/*
cricliveslbate01 --> cricLive SL bat End Of Over 1
cricliveslbate02 --> cricLive SL bat End of Over 2
cricliveindbate01 --> criclive Ind bat End of Over 1
cricliveindbatl02 --> criclive Ind bat last two balls left (we'll demenstrate the live socket)
*/
