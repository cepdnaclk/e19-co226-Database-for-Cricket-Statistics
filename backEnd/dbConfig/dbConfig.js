const mysql = require("mysql");

//local mysql db connection
// const dbConn = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "criclive",
// });


const dbConn = mysql.createConnection({
  host: 'gateway01.us-west-2.prod.aws.tidbcloud.com',
  port: 4000,
  user: '3m7pRf38p5JMiTT.root',
  password: 'eVl1nT9ZuSaRReP8',
  database: 'test',
  ssl: {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: true
  }
});




// const dbConn = mysql.createConnection({
//   host: 'gateway01.us-west-2.prod.aws.tidbcloud.com',
//   port: 4000,
//   user: '3m7pRf38p5JMiTT.root',
//   password: 'eVl1nT9ZuSaRReP8',
//   database: 'test',
//   ssl: {
//     minVersion: 'TLSv1.2',
//     rejectUnauthorized: true
//   }
// });

// const dbConn = mysql.createConnection({
//   host: "bzg2gtr1s18vgce364iy-mysql.services.clever-cloud.com",
//   user: "uvsdiey20opi9xq9",
//   password: "YFiru8Xlt4w95XIoMeJi",
//   database: "bzg2gtr1s18vgce364iy",
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
