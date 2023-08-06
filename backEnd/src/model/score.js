function batting(res){

    return res.map(res => {
        return {
        name: res.PlayerName,
        playerId:res.OnStrikeID,
        howOut: (res.IsOut)?"":"notOut",
        runs: res.TotalRuns,
        balls: res.BallsFaced,
        isOut:res.IsOut,
        fours: "4",
        sixes: "1",
        sr: res.TotalRuns*1.0/(res.BallsFaced*1.0/6)
    }});
   
}

function balling(res){

    return res.map(res => {
        return {
        name: res.PlayerName,
        overs: res.OverNumber,
        wickets: res.wicket,
        runs: res.run,
        econ: res.run*1.0/res.OverNumber,
    }});
}

module.exports = {batting, balling};