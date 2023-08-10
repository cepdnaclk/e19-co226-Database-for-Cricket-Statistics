const db = require("../../dbConfig/dbConfig");
const match = require("../util/match");

const sql_config = "SELECT * FROM CURRENTMATCH";

function config(){
    db.query(sql_config,(err, res) => {
        if (res != undefined){
            match.matchOver = res[0].MatchType
        } else {
            console.log(err);
        }
    });
}

module.exports = config;