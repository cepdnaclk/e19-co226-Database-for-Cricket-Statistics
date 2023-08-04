--total marks innings 1
SELECT SUM(TotalRuns) AS TotalRuns
FROM (
    SELECT SUM(RunsScored) AS TotalRuns FROM INNINGS1
    UNION ALL
    SELECT SUM(ExtraRuns) AS TotalRuns FROM EXTRAINNINGS1
) AS SubqueryAlias;

--total marks innings 2
SELECT SUM(TotalRuns) AS TotalRuns
FROM (
    SELECT SUM(RunsScored) AS TotalRuns FROM INNINGS2
    UNION ALL
    SELECT SUM(ExtraRuns) AS TotalRuns FROM EXTRAINNINGS2
) AS SubqueryAlias;

--wickets innings 1
SELECT COUNT(Ball_ID) FROM DISMISSALINNINGS1;

--wickets innings 2
SELECT COUNT(Ball_ID) FROM DISMISSALINNINGS2;

--overs and balls
SELECT OverNum, BallNumber FROM INNINGS1;

--overs and balls innings 2
SELECT OverNum, BallNumber FROM INNINGS1;
