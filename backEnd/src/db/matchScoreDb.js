const db = require("../../dbConfig/dbConfig")
const getStatus = require("../model/matchStatus");

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

function getScoreWicketOver(io, result, resultStatus){
    db.query(sql_getScore,(err, runs) => {
        db.query(sql_wickets,(err, wicket) => {
            db.query(sql_over,(err, over) => {
                db.query(sql_getExtra,(err, extra) => {

                    const extraInning1 = extra.filter(e => e.innings === 1);
                    const extraInning2 = extra.filter(e => e.innings === 2);

                    let data = runs.map((run) => {return {...run, ...(run.innings===wicket[0].innings)?wicket[0]:wicket[1], ...(run.innings===over[0].innings)?over[0]:over[1], ...(run.innings===over[0].innings)?{extra:getExtraObj(extraInning1)}:{extra:getExtraObj(extraInning2)}}});

                    data[0].isBatting = (data[1].TotalRuns === null)?true:false;
                    data[1].isBatting = (data[1].TotalRuns === null)?false:true;

                    data = data.map(d => {
                        return {
                            totalRuns:d.TotalRuns,
                            innings:d.innings,
                            teamId:d.teamId,
                            wicket:d.wickets,
                            overNum:d.OverNum,
                            ballNumber:d.BallNumber,
                            extra:d.extra,
                            isBatting:d.isBatting
                    };});
                    
                    result(io, data);
                    getMatchStatus(io, resultStatus, over);
                });
            });
        });
    });
}

function getExtraObj(extra){
    let obj = new Object();
    obj.total = 0;
    extra.map(e => obj.total += e.sumExtra);
    
    extra.map(e => {
        const type = e.Type;
        obj = {...obj,... {
            [type]:e.countType
        }};
    });
    
    return obj;
}

function getMatchStatus(io, result, data){

    let ball;
    let sql;
    if(data.length === 1){
        sql = sql_isOutInning1 + data[0].Ball_ID;
        ball = data[0];
    } else {
        sql = sql_isOutInning2 + data[1].Ball_ID;
        ball = data[1];
    }

    db.query(sql,(err, res) => {
        
        if (res.length === 0){
            ball.ball = ball.RunsScored;
        } else {
            ball.ball = "W";
        }
        result(io, {
            ball:ball.ball,
            comment:ball.Commentary,
            overNumber:ball.OverNum,
            ballNumber:ball.BallNumber
        });
    });
}


module.exports = {getScoreWicketOver, getMatchStatus};