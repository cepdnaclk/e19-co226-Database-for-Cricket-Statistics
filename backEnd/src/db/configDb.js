const db = require("../../dbConfig/dbConfig")

const sql_config = "SELECT * FROM TEAM";

function config(){
    db.query(sql_config,(err, res) => {
        
    });
}

module.exports = config;