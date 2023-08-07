const db = require("../../dbConfig/dbConfig")
const {batting, balling} = require("../model/score");

const sql_batting1 = "SELECT * FROM BatsmanScoresFirstInnings";

const sql_batman1 = ` 
SELECT OnStrikeID, NonStrikeID  FROM INNINGS1
WHERE Ball_ID = (SELECT MAX(Ball_ID) FROM  INNINGS1)
`;

const sql_batting2 = "SELECT * FROM BatsmanScoresSecondInnings";

const sql_batman2 = ` 
SELECT OnStrikeID, NonStrikeID  FROM INNINGS2
WHERE Ball_ID = (SELECT MAX(Ball_ID) FROM  INNINGS2)
`;

const sql_balling1 = "SELECT * FROM BowlingFiguresViewFirst";

const sql_balling2 = "SELECT * FROM BowlingFiguresViewSecond";

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
        db.query(sql_batman1,(err, two) => {
            result1(io, batting(one, two));
        });
    });

    db.query(sql_batting2,(err, one) => {
        db.query(sql_batman2,(err, two) => {
            result2(io, batting(one, two));
        });
    });
}


function getBallingScore(io, result1, result2){
    db.query(sql_balling1,(err, one) => {
        db.query(sql_bowling1,(err, two) => {
            result1(io, balling(one, two));
        });
    });

    db.query(sql_balling2,(err, one) => {
        db.query(sql_bowling2,(err, two) => {
            result2(io, balling(one, two));
        });
    });
}

module.exports = {getBattingScore, getBallingScore};

// {
//     name: "Pathum Nissanka",
//     howOut: "b J.Bumrah", //c Sangakkara b Muralitharan //run out (M. Jayawaradene) //lbw J.Bumrah
//     runs: "40",
//     balls: "35",
//     fours: "4",
//     sixes: "1",
//     sr: "114.29",
// }

// {
//     name: "Jaspreet Bumrah",
//     overs: "10",
//     maidens: "1",
//     wickets: "3",
//     runs: "37",
//     econ: "3.7",
// }
