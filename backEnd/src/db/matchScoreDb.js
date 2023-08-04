const db = require("../../dbConfig/dbConfig")
const getStatus = require("../model/matchStatus");

const sql_getScore = `SELECT SUM(TotalRuns) AS TotalRuns, 1 AS innings, (SELECT SUM(ExtraRuns) AS TotalRuns FROM EXTRAINNINGS1) as Extra
FROM (
    SELECT SUM(RunsScored) AS TotalRuns FROM INNINGS1
    UNION ALL
    SELECT SUM(ExtraRuns) AS TotalRuns FROM EXTRAINNINGS1
) AS SubqueryAlias
UNION
SELECT SUM(TotalRuns) AS TotalRuns, 2 AS innings, (SELECT SUM(ExtraRuns) AS TotalRuns FROM EXTRAINNINGS2) as Extra
FROM (
    SELECT SUM(RunsScored) AS TotalRuns FROM INNINGS2
    UNION ALL
    SELECT SUM(ExtraRuns) AS TotalRuns FROM EXTRAINNINGS2
) AS SubqueryAlias`;
const sql_wickets = `SELECT COUNT(Ball_ID) AS wickets, 1 AS innings  FROM DISMISSALINNINGS1
UNION
SELECT COUNT(Ball_ID) AS wickets, 2 AS innings  FROM DISMISSALINNINGS2;`
const sql_over = `SELECT OverNum, BallNumber, 1 AS innings FROM INNINGS1 WHERE Ball_ID = (SELECT MAX(Ball_ID) FROM  INNINGS1)
UNION
SELECT OverNum, BallNumber, 2 AS innings FROM INNINGS2 WHERE Ball_ID = (SELECT MAX(Ball_ID) FROM  INNINGS2);`;

const sql_getPlayingTeam = "";
const sql_getExtra = "";

function getScoreWicketOver(io, result, resultStatus){
    db.query(sql_getScore,(err, runs) => {
        db.query(sql_wickets,(err, wicket) => {
            db.query(sql_over,(err, over) => {
                const data = runs.map((run) => {return {...run, ...(run.innings===wicket[0].innings)?wicket[0]:wicket[1], ...(run.innings===over[0].innings)?over[0]:over[1]}});
                result(io, data);
                resultStatus(io, getStatus(data));

            });
        });
    });
}

function getExtra(io, result){
    db.query(sql_getExtra,(err, res) => {
        result(io, res);
    });
}

function getPlayingTeam(io, result){
    db.query(sql_getPlayingTeam,(err, res) => {
        result(io, res);
    });
}

module.exports = {getScoreWicketOver, getExtra, getPlayingTeam};