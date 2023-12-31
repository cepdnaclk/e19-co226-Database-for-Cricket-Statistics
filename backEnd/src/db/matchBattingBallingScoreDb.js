const db = require("../../dbConfig/dbConfig")
const {batting, balling} = require("../model/score");

const sql_batting1 = "SELECT * FROM BatsmanScoresFirstInnings";

const sql_batman1 = ` 
SELECT *  FROM INNINGS1
WHERE Ball_ID = (SELECT MAX(Ball_ID) FROM  INNINGS1)
`;

const sql_nonStriker1 = `
SELECT * FROM PLAYER
INNER JOIN INNINGS1 ON PLAYER.PlayerID = INNINGS1.NonStrikeID
WHERE INNINGS1.Ball_ID = (SELECT MAX(Ball_ID) FROM  INNINGS1)
`;

const sql_nonStriker2 = `
SELECT * FROM PLAYER
INNER JOIN INNINGS2 ON PLAYER.PlayerID = INNINGS2.NonStrikeID
WHERE INNINGS2.Ball_ID = (SELECT MAX(Ball_ID) FROM  INNINGS2)
`;

const sql_batting2 = "SELECT * FROM BatsmanScoresSecondInnings";

const sql_batman2 = ` 
SELECT *  FROM INNINGS2
WHERE Ball_ID = (SELECT MAX(Ball_ID) FROM  INNINGS2)
`;

const sql_balling1 = "SELECT * FROM BowlingFiguresViewfirst";

const sql_balling2 = "SELECT * FROM BowlingFiguresViewsecond";

const sql_bowling1 = ` 
SELECT CurrentBowlerID FROM INNINGS1
WHERE Ball_ID = (SELECT MAX(Ball_ID) FROM  INNINGS1)
`;

const sql_bowling2 = ` 
SELECT CurrentBowlerID  FROM INNINGS2
WHERE Ball_ID = (SELECT MAX(Ball_ID) FROM  INNINGS2)
`;

function getBattingScore(io, result1, result2){
    db.query(sql_batting1,(err, one) => {
        // console.log(err);
        db.query(sql_batman1,(err, two) => {
            // console.log(err);
            db.query(sql_nonStriker1,(err, three) => {
                // console.log(err);
                if (one != undefined && two != undefined){
                    result1(io, batting(one, two, three));
                }
            });
        });
    });

    db.query(sql_batting2,(err, one) => {
        // console.log(err);
        db.query(sql_batman2,(err, two) => {
            // console.log(err);
            db.query(sql_nonStriker2,(err, three) => {
                // console.log(err);
                if (one != undefined && two != undefined){
                    result2(io, batting(one, two, three));
                }
            });
        });
    });
}


function getBallingScore(io, result1, result2){
    db.query(sql_balling1,(err, one) => {
        // console.log(err);
        db.query(sql_bowling1,(err, two) => {
            // console.log(err);
            if (one != undefined && two != undefined){
                result1(io, balling(one, two));
            }
        });
    });

    db.query(sql_balling2,(err, one) => {
        // console.log(err);
        db.query(sql_bowling2,(err, two) => {
            // console.log(err);
            if (one != undefined && two != undefined){
                result2(io, balling(one, two));
            }
        });
    });
}

module.exports = {getBattingScore, getBallingScore};
