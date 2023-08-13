const db = require("../../dbConfig/dbConfig");
const match = require("../util/match");

const sql_getScore = `
SELECT SUM(TotalRuns) AS TotalRuns, 1 AS innings, (SELECT Team1_ID FROM CURRENTMATCH) as teamId
FROM (
    SELECT SUM(RunsScored) AS TotalRuns FROM INNINGS1
    UNION ALL
    SELECT SUM(ExtraRuns) AS TotalRuns FROM EXTRAINNINGS1
) AS SubqueryAlias
UNION
SELECT SUM(TotalRuns) AS TotalRuns, 2 AS innings, (SELECT Team2_ID FROM CURRENTMATCH) as teamId
FROM (
    SELECT SUM(RunsScored) AS TotalRuns FROM INNINGS2
    UNION ALL
    SELECT SUM(ExtraRuns) AS TotalRuns FROM EXTRAINNINGS2
) AS SubqueryAlias`;

const sql_wickets = `
SELECT COUNT(Ball_ID) AS wickets, 1 AS innings  FROM DISMISSALINNINGS1
UNION
SELECT COUNT(Ball_ID) AS wickets, 2 AS innings  FROM DISMISSALINNINGS2;`;

const sql_over = `
SELECT OverNum, BallNumber, Commentary, RunsScored, Ball_ID, 1 AS innings FROM INNINGS1 WHERE Ball_ID = (SELECT MAX(Ball_ID) FROM  INNINGS1)
UNION
SELECT OverNum, BallNumber, Commentary, RunsScored, Ball_ID, 2 AS innings FROM INNINGS2 WHERE Ball_ID = (SELECT MAX(Ball_ID) FROM  INNINGS2);`;

const sql_getExtra = `
SELECT COUNT(Type) as countType, Type, SUM(ExtraRuns) as sumExtra, 1 AS innings  FROM EXTRAINNINGS1
GROUP BY Type
UNION
SELECT COUNT(Type) as countType, Type, SUM(ExtraRuns) as sumExtra, 2 AS innings  FROM EXTRAINNINGS2
GROUP BY Type
`;

const sql_isOutInning1 = ` 
SELECT * FROM DISMISSALINNINGS1
WHERE BALL_ID =
`;

const sql_isOutInning2 = ` 
SELECT * FROM DISMISSALINNINGS2
WHERE BALL_ID =
`;

const sql_isExtra1 = ` 
SELECT * FROM extrainnings1
WHERE BALL_ID =
`;

const sql_isExtra2 = ` 
SELECT * FROM extrainnings2
WHERE BALL_ID =
`;

function getScoreWicketOver(io, result, resultStatus) {
  db.query(sql_getScore, (err, runs) => {
    if (runs == undefined) {
      console.log(err);
      return;
    }

    db.query(sql_wickets, (err, wicket) => {
      if (wicket == undefined) {
        console.log(err);
        return;
      }

      db.query(sql_over, (err, over) => {
        if (over == undefined) {
          console.log(err);
          return;
        }

        db.query(sql_getExtra, (err, extra) => {
          if (extra == undefined) {
            console.log(err);
            return;
          }

          const extraInning1 = extra.filter((e) => e.innings === 1);
          const extraInning2 = extra.filter((e) => e.innings === 2);

          let data = runs.map((run) => {
            return {
              ...run,
              ...(run.innings === wicket[0].innings ? wicket[0] : wicket[1]),
              ...(run.innings === over[0].innings ? over[0] : over[1]),
              ...(run.innings === over[0].innings
                ? { extra: getExtraObj(extraInning1) }
                : { extra: getExtraObj(extraInning2) }),
            };
          });

          data[0].isBatting = data[1].TotalRuns === null ? true : false;
          data[1].isBatting = data[1].TotalRuns === null ? false : true;

          data = data.map((d) => {
            return {
              totalRuns: d.TotalRuns,
              innings: d.innings,
              teamId: d.teamId,
              wickets: d.wickets,
              overNum: d.OverNum === undefined ? 0 : d.OverNum,
              ballNumber: d.BallNumber === undefined ? 0 : d.BallNumber,
              extras: {
                total: d.extra.total,
                wides: d.extra.wides === undefined ? 0 : d.extra.wides,
                noBalls: d.extra.noBalls === undefined ? 0 : d.extra.noBalls,
                legByes: d.extra.legByes === undefined ? 0 : d.extra.legByes,
                byes: d.extra.byes === undefined ? 0 : d.extra.byes,
              },
              isBatting: d.isBatting,
            };
          });

          result(io, data);
          getMatchStatus(io, resultStatus, over, data);
        });
      });
    });
  });
}

function getExtraObj(extra) {
  let obj = new Object();
  obj.total = 0;
  extra.map((e) => (obj.total += e.sumExtra));

  extra.map((e) => {
    const type = e.Type;
    obj = {
      ...obj,
      ...{
        [type]: e.countType,
      },
    };
  });

  return obj;
}

function getMatchStatus(io, result, data, data1) {

  let ball;
  let sql;
  if (data.length === 1) {
    sql = sql_isOutInning1 + data[0].Ball_ID;
    ball = data[0];
  } else {
    sql = sql_isOutInning2 + data[1].Ball_ID;
    ball = data[1];
  }

  db.query(sql, (err, res) => {

    if (res == undefined) {
      console.log(err);
      return;
    }

    if (res.length === 0) {
      ball.ball = ball.RunsScored;
    } else {
      ball.ball = "W";

      result(io, {
        matchOver:
          (data1[1].totalRuns !== null &&
          ((data1[1].overNum === (match.matchOver - 1) &&
            data1[1].ballNumber === match.matchBalls) ||
            data1[1].wicket === match.matchWickets ||
            data1[0].totalRuns < data1[1].totalRuns))
            ? true
            : false,
        ball: ball.ball,
        comment: ball.Commentary === null ? "" : ball.Commentary,
        overNumber: ball.OverNum,
        ballNumber: ball.BallNumber,
        ballId: ball.Ball_ID,
      });

      return;
    }

    let sql_e;
    if (data.length === 1) {
      sql_e = sql_isExtra1 + data[0].Ball_ID;
    } else {
      sql_e = sql_isExtra2 + data[1].Ball_ID;
    }

    db.query(sql_e, (err, extra) => {
      if (extra == undefined) {
        return;
      }

      if (extra.length !== 0) {
        switch (extra[0].Type) {
          case "wides":
            ball.ball = "wd";
            break;

          case "noBalls":
            ball.ball = "nb";
            break;

          case "legByes":
            ball.ball = "lb";
            break;

          case "byes":
            ball.ball = "b";
            break;

          default:
            ball.ball = ball.ball;
        }
      }

      result(io, {
        matchOver:
          (data1[1].totalRuns !== null &&
          ((data1[1].overNum === (match.matchOver - 1) &&
            data1[1].ballNumber === match.matchBalls) ||
            data1[1].wicket === match.matchWickets ||
            data1[0].totalRuns < data1[1].totalRuns))
            ? true
            : false,
        ball: ball.ball,
        comment: ball.Commentary === null ? "" : ball.Commentary,
        overNumber: ball.OverNum,
        ballNumber: ball.BallNumber,
        ballId: ball.Ball_ID,
      });
    });
  });
}

module.exports = { getScoreWicketOver, getMatchStatus };
