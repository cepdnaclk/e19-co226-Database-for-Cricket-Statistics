const db = require("../../dbConfig/dbConfig")
const {batting, balling} = require("../model/score");

const sql_batting1 = "SELECT * FROM BatsmanScores";

const sql_batting2 = "SELECT * FROM BatsmanScores";

const sql_balling1 = "SELECT * FROM BatsmanScores";

const sql_balling2 = "SELECT * FROM BatsmanScores";

function getBattingScore(io, result1, result2){
    db.query(sql_batting1,(err, one) => {
        result1(io, batting(one));
    });

    db.query(sql_batting2,(err, two) => {
        result2(io, batting(two));
    });
}


function getBallingScore(io, result1, result2){
    db.query(sql_balling1,(err, one) => {
        result1(io, balling(one));
    });

    db.query(sql_balling2,(err, two) => {
        result2(io, balling(two));
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
