const db = require("../../dbConfig/dbConfig");

const sql_commentry = `
SELECT OverNum, BallNumber, Commentary, RunsScored, Ball_ID, 1 AS innings FROM INNINGS1
UNION 
SELECT OverNum, BallNumber, Commentary, RunsScored, Ball_ID, 2 AS innings FROM INNINGS2 
ORDER BY innings DESC, Ball_ID DESC
LIMIT 5;
`;

const sql_wickets = `
SELECT Ball_ID, 1 AS innings FROM INNINGS1
NATURAL JOIN DISMISSALINNINGS1 
UNION 
SELECT Ball_ID, 2 AS innings FROM INNINGS2 
NATURAL JOIN DISMISSALINNINGS2
ORDER BY innings DESC, Ball_ID DESC
limit 5
`;

const sql_extra = `
SELECT Ball_ID, 1 AS innings, Type FROM INNINGS1
NATURAL JOIN EXTRAINNINGS1 
UNION 
SELECT Ball_ID, 2 AS innings, Type FROM INNINGS2 
NATURAL JOIN EXTRAINNINGS2
ORDER BY innings DESC, Ball_ID DESC
limit 5
`;

function getCommentry(res) {
  db.query(sql_commentry, (err, comments) => {
    if (comments == undefined) {
      console.log(err);
      res.status(404);
      return;
    }

    console.log(comments)

    db.query(sql_wickets, (err, wicket) => {
      if (wicket == undefined) {
        console.log(err);
        res.status(404);
        return;
      }

      db.query(sql_extra, (err, extra) => {
        if (extra == undefined) {
          console.log(err);
          res.status(404);
          return;
        }

        let comment = comments.map((c) => {
          if (
            wicket.filter(
              (w) => w.Ball_ID === c.Ball_ID && w.innings === c.innings
            ).length !== 0
          ) {
            return {
              ball: "W",
              comment: c.Commentary === null ? "" : c.Commentary,
              overNumber: c.OverNum,
              ballNumber: c.BallNumber,
              ballId: c.Ball_ID,
              innings: c.innings,
            };
          }
          return {
            ball: c.RunsScored,
            comment: c.Commentary === null ? "" : c.Commentary,
            overNumber: c.OverNum,
            ballNumber: c.BallNumber,
            ballId: c.Ball_ID,
            innings: c.innings,
          };
        });

        comment.forEach((c) => {
          extra.forEach((w) => {
            if (w.Ball_ID === c.ballId && w.innings === c.innings) {
              switch (w.Type) {
                case "wides":
                  c.ball = "wd";
                  break;

                case "noBalls":
                  c.ball = "nb";
                  break;

                case "legByes":
                  c.ball = "lb";
                  break;

                case "byes":
                  c.ball = "b";
                  break;

                default:
                  c.ball = c.ball;
              }
            }
          });
        });

        res.status(200).json(comment);
      });
    });
  });
}

module.exports = getCommentry;
