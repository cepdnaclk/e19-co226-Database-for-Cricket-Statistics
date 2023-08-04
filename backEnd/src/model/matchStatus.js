function getStatus(data){
    let matchStatus = new Object();

    matchStatus.playingInnings = (data[1].TotalRuns === null)?1:2;

    matchStatus.status = ((data[0].wickets === 10 && data[0].wickets === 10) || (data[0].OverNum === 20 && data[0].BallNumber === 6) || (data[1].OverNum === 20 && data[1].BallNumber === 6) )?"over":"playing";
    matchStatus.win = (data[0].TotalRuns > data[1].TotalRuns)?1:2;

    return matchStatus;
}

module.exports = getStatus;