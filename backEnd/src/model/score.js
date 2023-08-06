function batting(res){

    return res.map(res => {
        return {
        name: res.PlayerName,
        playerId:res.PlayerID,
        howOut: (res.IsOut)?"":"Not Out",
        runs: res.TotalRuns,
        balls: res.BallsFaced,
        isOut:res.IsOut,
        // fours: "4",
        // sixes: "1",
        sr: (res.TotalRuns*0.1*6)/(res.BallsFaced*0.1)
    }});
   
}

function balling(res){

    return res.map(res => {
        return {
        name: res.PlayerName,
        overs: res.OverNumber,
        wickets: res.wicket,
        runs: res.run,
        econ: (res.run*0.1)/(res.OverNumber*0.1),
    }});
}

module.exports = {batting, balling};