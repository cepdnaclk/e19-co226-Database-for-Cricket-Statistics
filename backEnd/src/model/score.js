function batting(res, playing){

    playing = (playing.length === 0)?[{}]:playing;

    return res.map(res => {
        return {
        name: res.PlayerName,
        playerId:res.PlayerID,
        howOut: (res.IsOut === 0)?"Not Out":getHowOut(res),
        runs: res.TotalRuns,
        balls: res.BallsFaced,
        onStrike:(playing[0].OnStrikeID === res.PlayerID)?true:false,
        fours: res.fours,
        sixes: res.sixes,
        sr: ((res.TotalRuns*0.1*6)/(res.BallsFaced*0.1)).toFixed(2)
    }});
}

function  getHowOut(res){
    switch(res.howOut){
        case "runOut":
            return res.fieldedBy;

        case "":
            return res.fieldedBy;
        
        default:
            return "";
    }
}

function balling(res, playing){


    playing = (playing.length === 0)?[{}]:playing;

    return res.map(res => {
        return {
        playerId:res.PlayerID,
        name: res.PlayerName,
        overs: Math.floor(res.BallsFaced/6),
        wickets: res.NumberOfWickets,
        runs: res.TotalRuns,
        ballNumber:res.BallsFaced%6,
        econ: ((res.TotalRuns*0.1)/(res.BallsFaced*0.1/6)).toFixed(2),
        currentBowler:(playing[0].CurrentBowlerID === res.PlayerID)?true:false,
        maidenOver:res.MaidenOvers
    }});
}

module.exports = {batting, balling};