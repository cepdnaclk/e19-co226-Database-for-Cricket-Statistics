const db = require("../../dbConfig/dbConfig")

function getData(io, result){
    db.query("select * from student",(err, res) => {
        result(io, res);
    });
}

module.exports = getData;