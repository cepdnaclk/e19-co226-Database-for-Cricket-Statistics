function getStatus(res){
    let matchStatus = new Object();

    matchStatus.status = "win";
    matchStatus.win = "player1";

    return matchStatus;
}

module.exports = getStatus;