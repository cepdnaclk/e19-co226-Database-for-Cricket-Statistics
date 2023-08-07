const mysql = require("mysql");

//local mysql db connection

const dbConn = mysql.createConnection({
  host: "bzg2gtr1s18vgce364iy-mysql.services.clever-cloud.com",
  user: "uvsdiey20opi9xq9",
  password: "YFiru8Xlt4w95XIoMeJi",
  database: "bzg2gtr1s18vgce364iy",
});

// const dbConn = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "criclive",
// });

// connect db
dbConn.connect(function (err) {
  if (err) throw err;
  console.log("Database Connected!");
});

module.exports = dbConn;
