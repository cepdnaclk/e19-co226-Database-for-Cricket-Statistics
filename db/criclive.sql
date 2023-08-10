-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 10, 2023 at 07:01 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `criclive`
--

-- --------------------------------------------------------

--
-- Stand-in structure for view `batsmanscoresfirstinnings`
-- (See below for the actual view)
--
CREATE TABLE `batsmanscoresfirstinnings` (
`PlayerName` varchar(40)
,`PlayerID` int(11)
,`TotalRuns` decimal(32,0)
,`fours` bigint(21)
,`sixes` bigint(21)
,`BallsFaced` bigint(21)
,`IsOut` int(1)
,`howOut` varchar(15)
,`caughtBy` varchar(40)
,`fieldedBy` varchar(40)
,`bowled` varchar(40)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `batsmanscoressecondinnings`
-- (See below for the actual view)
--
CREATE TABLE `batsmanscoressecondinnings` (
`PlayerName` varchar(40)
,`PlayerID` int(11)
,`TotalRuns` decimal(32,0)
,`BallsFaced` bigint(21)
,`IsOut` int(1)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `bowlingfiguresviewfirst`
-- (See below for the actual view)
--
CREATE TABLE `bowlingfiguresviewfirst` (
`PlayerName` varchar(40)
,`PlayerID` int(11)
,`TotalRuns` decimal(54,0)
,`NumberOfWickets` bigint(21)
,`BallsFaced` bigint(21)
,`MaidenOvers` bigint(21)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `bowlingfiguresviewsecond`
-- (See below for the actual view)
--
CREATE TABLE `bowlingfiguresviewsecond` (
`PlayerName` varchar(40)
,`PlayerID` int(11)
,`TotalRuns` decimal(54,0)
,`NumberOfWickets` bigint(21)
,`BallsFaced` bigint(21)
,`MaidenOvers` bigint(21)
);

-- --------------------------------------------------------

--
-- Table structure for table `currentmatch`
--

CREATE TABLE `currentmatch` (
  `Team1_ID` int(11) NOT NULL,
  `Team2_ID` int(11) NOT NULL,
  `Date` date NOT NULL,
  `Time` time DEFAULT NULL,
  `Venue` varchar(30) DEFAULT NULL,
  `Toss` int(11) DEFAULT NULL,
  `MatchName` varchar(50) DEFAULT NULL,
  `TossIsBatting` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `currentmatch`
--

INSERT INTO `currentmatch` (`Team1_ID`, `Team2_ID`, `Date`, `Time`, `Venue`, `Toss`, `MatchName`, `TossIsBatting`) VALUES
(1, 2, '2023-08-10', '15:00:00', 'Melbourne Stadium', 1, 'Australia vs India', 1);

-- --------------------------------------------------------

--
-- Table structure for table `dismissalinnings1`
--

CREATE TABLE `dismissalinnings1` (
  `Ball_ID` int(11) NOT NULL,
  `DismissType` varchar(15) DEFAULT NULL,
  `CaughtBy` int(11) DEFAULT NULL,
  `FieldedBy` int(11) DEFAULT NULL,
  `Dismissed` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dismissalinnings1`
--

INSERT INTO `dismissalinnings1` (`Ball_ID`, `DismissType`, `CaughtBy`, `FieldedBy`, `Dismissed`) VALUES
(3, 'runOut', NULL, 5, 1),
(6, 'Caught', 4, NULL, 2);

-- --------------------------------------------------------

--
-- Table structure for table `dismissalinnings2`
--

CREATE TABLE `dismissalinnings2` (
  `Ball_ID` int(11) NOT NULL,
  `DismissType` varchar(15) DEFAULT NULL,
  `CaughtBy` int(11) DEFAULT NULL,
  `FieldedBy` int(11) DEFAULT NULL,
  `Dismissed` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dismissalinnings2`
--

INSERT INTO `dismissalinnings2` (`Ball_ID`, `DismissType`, `CaughtBy`, `FieldedBy`, `Dismissed`) VALUES
(2, 'Caught', 5, NULL, 3),
(3, 'Bowled', NULL, NULL, 5);

-- --------------------------------------------------------

--
-- Table structure for table `extrainnings1`
--

CREATE TABLE `extrainnings1` (
  `Ball_ID` int(11) NOT NULL,
  `Type` varchar(15) DEFAULT NULL,
  `ExtraRuns` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `extrainnings1`
--

INSERT INTO `extrainnings1` (`Ball_ID`, `Type`, `ExtraRuns`) VALUES
(4, 'Leg Bye', 1),
(6, 'No Ball', 2),
(7, 'byes', 1);

-- --------------------------------------------------------

--
-- Table structure for table `extrainnings2`
--

CREATE TABLE `extrainnings2` (
  `Ball_ID` int(11) NOT NULL,
  `Type` varchar(15) DEFAULT NULL,
  `ExtraRuns` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `extrainnings2`
--

INSERT INTO `extrainnings2` (`Ball_ID`, `Type`, `ExtraRuns`) VALUES
(1, 'No Ball', 2),
(5, 'Wide', 1),
(6, 'legByes', 2);

-- --------------------------------------------------------

--
-- Table structure for table `innings1`
--

CREATE TABLE `innings1` (
  `Ball_ID` int(11) NOT NULL,
  `OverNum` int(11) DEFAULT NULL,
  `BallNumber` int(11) DEFAULT NULL,
  `RunsScored` int(11) DEFAULT NULL,
  `OnStrikeID` int(11) DEFAULT NULL,
  `NonStrikeID` int(11) DEFAULT NULL,
  `CurrentBowlerID` int(11) DEFAULT NULL,
  `Commentary` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `innings1`
--

INSERT INTO `innings1` (`Ball_ID`, `OverNum`, `BallNumber`, `RunsScored`, `OnStrikeID`, `NonStrikeID`, `CurrentBowlerID`, `Commentary`) VALUES
(1, 1, 1, 4, 1, 5, 2, NULL),
(2, 1, 2, 1, 1, 5, 2, NULL),
(3, 1, 3, 0, 5, 1, 2, NULL),
(4, 2, 1, 2, 5, 1, 4, NULL),
(5, 2, 2, 6, 5, 1, 4, NULL),
(6, 2, 3, 0, 1, 5, 1, NULL),
(7, 3, 1, 12, 1, 2, 2, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `innings2`
--

CREATE TABLE `innings2` (
  `Ball_ID` int(11) NOT NULL,
  `OverNum` int(11) DEFAULT NULL,
  `BallNumber` int(11) DEFAULT NULL,
  `RunsScored` int(11) DEFAULT NULL,
  `OnStrikeID` int(11) DEFAULT NULL,
  `NonStrikeID` int(11) DEFAULT NULL,
  `CurrentBowlerID` int(11) DEFAULT NULL,
  `Commentary` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `innings2`
--

INSERT INTO `innings2` (`Ball_ID`, `OverNum`, `BallNumber`, `RunsScored`, `OnStrikeID`, `NonStrikeID`, `CurrentBowlerID`, `Commentary`) VALUES
(1, 1, 1, 2, 2, 4, 1, NULL),
(2, 1, 2, 1, 2, 4, 1, NULL),
(3, 1, 3, 4, 2, 4, 2, NULL),
(4, 2, 1, 6, 4, 2, 5, NULL),
(5, 2, 2, 0, 4, 2, 5, NULL),
(6, 2, 3, 1, 4, 2, 5, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `player`
--

CREATE TABLE `player` (
  `PlayerID` int(11) NOT NULL,
  `PlayerName` varchar(40) DEFAULT NULL,
  `PlayerType` varchar(15) DEFAULT NULL,
  `DateofBirth` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `player`
--

INSERT INTO `player` (`PlayerID`, `PlayerName`, `PlayerType`, `DateofBirth`) VALUES
(1, 'John Doe', 'Batsman', '1990-05-15'),
(2, 'Jane Smith', 'Bowler', '1988-10-21'),
(3, 'Michael Johnson', 'All-rounder', '1992-03-08'),
(4, 'Sarah Williams', 'Batsman', '1995-07-04'),
(5, 'Robert Lee', 'Bowler', '1985-12-30');

-- --------------------------------------------------------

--
-- Table structure for table `team`
--

CREATE TABLE `team` (
  `TeamID` int(11) NOT NULL,
  `TeamName` varchar(20) DEFAULT NULL,
  `Country` varchar(20) DEFAULT NULL,
  `Coach` varchar(20) DEFAULT NULL,
  `CaptainID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `team`
--

INSERT INTO `team` (`TeamID`, `TeamName`, `Country`, `Coach`, `CaptainID`) VALUES
(1, 'TeamA', 'Australia', 'David Smith', 1),
(2, 'TeamB', 'India', 'Raj Singh', 2),
(3, 'TeamC', 'England', 'Andrew Brown', 3);

-- --------------------------------------------------------

--
-- Table structure for table `teamplayers`
--

CREATE TABLE `teamplayers` (
  `PlayerID` int(11) NOT NULL,
  `TeamID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teamplayers`
--

INSERT INTO `teamplayers` (`PlayerID`, `TeamID`) VALUES
(1, 1),
(5, 1),
(2, 2),
(4, 2),
(3, 3);

-- --------------------------------------------------------

--
-- Structure for view `batsmanscoresfirstinnings`
--
DROP TABLE IF EXISTS `batsmanscoresfirstinnings`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `batsmanscoresfirstinnings`  AS SELECT `p`.`PlayerName` AS `PlayerName`, `i1`.`OnStrikeID` AS `PlayerID`, sum(`i1`.`RunsScored`) AS `TotalRuns`, count(case when `i1`.`RunsScored` = 4 then `i1`.`Ball_ID` else NULL end) AS `fours`, count(case when `i1`.`RunsScored` = 6 then `i1`.`Ball_ID` else NULL end) AS `sixes`, count(`i1`.`Ball_ID`) AS `BallsFaced`, CASE WHEN `i1`.`OnStrikeID` in (select `dismissalinnings1`.`Dismissed` from `dismissalinnings1`) THEN 1 ELSE 0 END AS `IsOut`, CASE WHEN `i1`.`OnStrikeID` in (select `dismissalinnings1`.`Dismissed` from `dismissalinnings1`) THEN (select `dismissalinnings1`.`DismissType` from `dismissalinnings1` where `i1`.`OnStrikeID` = `dismissalinnings1`.`Dismissed`) ELSE NULL END AS `howOut`, CASE WHEN `i1`.`OnStrikeID` in (select `dismissalinnings1`.`Dismissed` from `dismissalinnings1`) THEN (select `player`.`PlayerName` from (`player` join `dismissalinnings1` on(`player`.`PlayerID` = `dismissalinnings1`.`CaughtBy`)) where `dismissalinnings1`.`Dismissed` = `i1`.`OnStrikeID`) ELSE NULL END AS `caughtBy`, CASE WHEN `i1`.`OnStrikeID` in (select `dismissalinnings1`.`Dismissed` from `dismissalinnings1`) THEN (select `player`.`PlayerName` from (`player` join `dismissalinnings1` on(`player`.`PlayerID` = `dismissalinnings1`.`FieldedBy`)) where `dismissalinnings1`.`Dismissed` = `i1`.`OnStrikeID`) ELSE NULL END AS `fieldedBy`, CASE WHEN `i1`.`OnStrikeID` in (select `dismissalinnings1`.`Dismissed` from `dismissalinnings1`) THEN (select `player`.`PlayerName` from `player` where `player`.`PlayerID` = (select `innings1`.`CurrentBowlerID` from `innings1` where `innings1`.`Ball_ID` = (select `dismissalinnings1`.`Ball_ID` from `dismissalinnings1` where `i1`.`OnStrikeID` = `dismissalinnings1`.`Dismissed`))) ELSE NULL END AS `bowled` FROM (`innings1` `i1` join `player` `p` on(`i1`.`OnStrikeID` = `p`.`PlayerID`)) GROUP BY `p`.`PlayerName`, `i1`.`OnStrikeID``OnStrikeID`  ;

-- --------------------------------------------------------

--
-- Structure for view `batsmanscoressecondinnings`
--
DROP TABLE IF EXISTS `batsmanscoressecondinnings`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `batsmanscoressecondinnings`  AS SELECT `p`.`PlayerName` AS `PlayerName`, `i2`.`OnStrikeID` AS `PlayerID`, sum(`i2`.`RunsScored`) AS `TotalRuns`, count(`i2`.`Ball_ID`) AS `BallsFaced`, 0 AS `IsOut` FROM (`innings2` `i2` join `player` `p` on(`i2`.`OnStrikeID` = `p`.`PlayerID`)) GROUP BY `p`.`PlayerName`, `i2`.`OnStrikeID``OnStrikeID`  ;

-- --------------------------------------------------------

--
-- Structure for view `bowlingfiguresviewfirst`
--
DROP TABLE IF EXISTS `bowlingfiguresviewfirst`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `bowlingfiguresviewfirst`  AS SELECT `p`.`PlayerName` AS `PlayerName`, `p`.`PlayerID` AS `PlayerID`, ifnull(`tr`.`TotalRuns`,0) AS `TotalRuns`, ifnull(`nw`.`numberOfWickets`,0) AS `NumberOfWickets`, ifnull(`bf`.`ballsFaced`,0) AS `BallsFaced`, ifnull(`mo`.`MaidenOvers`,0) AS `MaidenOvers` FROM ((((`player` `p` join (select `subqueryalias`.`CurrentBowlerID` AS `CurrentBowlerID`,sum(`subqueryalias`.`TotalRuns`) AS `TotalRuns` from (select `innings1`.`CurrentBowlerID` AS `CurrentBowlerID`,sum(`innings1`.`RunsScored`) AS `TotalRuns` from `innings1` group by `innings1`.`CurrentBowlerID` union all select `i1`.`CurrentBowlerID` AS `CurrentBowlerID`,sum(`e1`.`ExtraRuns`) AS `TotalRuns` from (`extrainnings1` `e1` join `innings1` `i1` on(`e1`.`Ball_ID` = `i1`.`Ball_ID`)) group by `i1`.`CurrentBowlerID`) `subqueryalias` group by `subqueryalias`.`CurrentBowlerID`) `tr` on(`p`.`PlayerID` = `tr`.`CurrentBowlerID`)) left join (select `innings1`.`CurrentBowlerID` AS `CurrentBowlerID`,count(`innings1`.`Ball_ID`) AS `numberOfWickets` from `innings1` where `innings1`.`Ball_ID` in (select `dismissalinnings1`.`Ball_ID` from `dismissalinnings1`) group by `innings1`.`CurrentBowlerID`) `nw` on(`p`.`PlayerID` = `nw`.`CurrentBowlerID`)) left join (select `innings1`.`CurrentBowlerID` AS `CurrentBowlerID`,count(`innings1`.`Ball_ID`) AS `ballsFaced` from `innings1` group by `innings1`.`CurrentBowlerID`) `bf` on(`p`.`PlayerID` = `bf`.`CurrentBowlerID`)) left join (select `innings1`.`CurrentBowlerID` AS `CurrentBowlerID`,count(distinct `innings1`.`OverNum`) AS `MaidenOvers` from `innings1` where `innings1`.`RunsScored` = 0 and !(`innings1`.`Ball_ID` in (select `extrainnings1`.`Ball_ID` from `extrainnings1` union select `dismissalinnings1`.`Ball_ID` from `dismissalinnings1`)) group by `innings1`.`CurrentBowlerID`) `mo` on(`p`.`PlayerID` = `mo`.`CurrentBowlerID`))  ;

-- --------------------------------------------------------

--
-- Structure for view `bowlingfiguresviewsecond`
--
DROP TABLE IF EXISTS `bowlingfiguresviewsecond`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `bowlingfiguresviewsecond`  AS SELECT `p`.`PlayerName` AS `PlayerName`, `p`.`PlayerID` AS `PlayerID`, ifnull(`tr`.`TotalRuns`,0) AS `TotalRuns`, ifnull(`nw`.`numberOfWickets`,0) AS `NumberOfWickets`, ifnull(`bf`.`ballsFaced`,0) AS `BallsFaced`, ifnull(`mo`.`MaidenOvers`,0) AS `MaidenOvers` FROM ((((`player` `p` join (select `subqueryalias`.`CurrentBowlerID` AS `CurrentBowlerID`,sum(`subqueryalias`.`TotalRuns`) AS `TotalRuns` from (select `innings2`.`CurrentBowlerID` AS `CurrentBowlerID`,sum(`innings2`.`RunsScored`) AS `TotalRuns` from `innings2` group by `innings2`.`CurrentBowlerID` union all select `i1`.`CurrentBowlerID` AS `CurrentBowlerID`,sum(`e1`.`ExtraRuns`) AS `TotalRuns` from (`extrainnings2` `e1` join `innings2` `i1` on(`e1`.`Ball_ID` = `i1`.`Ball_ID`)) group by `i1`.`CurrentBowlerID`) `subqueryalias` group by `subqueryalias`.`CurrentBowlerID`) `tr` on(`p`.`PlayerID` = `tr`.`CurrentBowlerID`)) left join (select `innings1`.`CurrentBowlerID` AS `CurrentBowlerID`,count(`innings1`.`Ball_ID`) AS `numberOfWickets` from `innings1` where !(`innings1`.`Ball_ID` in (select `dismissalinnings2`.`Ball_ID` from `dismissalinnings2` where `dismissalinnings2`.`DismissType` = 'runOut')) group by `innings1`.`CurrentBowlerID`) `nw` on(`p`.`PlayerID` = `nw`.`CurrentBowlerID`)) left join (select `innings1`.`CurrentBowlerID` AS `CurrentBowlerID`,count(`innings1`.`Ball_ID`) AS `ballsFaced` from `innings1` group by `innings1`.`CurrentBowlerID`) `bf` on(`p`.`PlayerID` = `bf`.`CurrentBowlerID`)) left join (select `innings2`.`CurrentBowlerID` AS `CurrentBowlerID`,count(distinct `innings2`.`OverNum`) AS `MaidenOvers` from `innings2` where `innings2`.`RunsScored` = 0 and !(`innings2`.`Ball_ID` in (select `extrainnings2`.`Ball_ID` from `extrainnings2` union select `dismissalinnings2`.`Ball_ID` from `dismissalinnings2`)) group by `innings2`.`CurrentBowlerID`) `mo` on(`p`.`PlayerID` = `mo`.`CurrentBowlerID`))  ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `currentmatch`
--
ALTER TABLE `currentmatch`
  ADD PRIMARY KEY (`Team1_ID`,`Team2_ID`,`Date`),
  ADD KEY `fk_team2` (`Team2_ID`),
  ADD KEY `fk_toss` (`Toss`);

--
-- Indexes for table `dismissalinnings1`
--
ALTER TABLE `dismissalinnings1`
  ADD PRIMARY KEY (`Ball_ID`),
  ADD KEY `fk_caughtby1` (`CaughtBy`),
  ADD KEY `fk_fieldedby1` (`FieldedBy`),
  ADD KEY `fk_dismissed1` (`Dismissed`);

--
-- Indexes for table `dismissalinnings2`
--
ALTER TABLE `dismissalinnings2`
  ADD PRIMARY KEY (`Ball_ID`),
  ADD KEY `fk_caughtby2` (`CaughtBy`),
  ADD KEY `fk_fieldedby2` (`FieldedBy`),
  ADD KEY `fk_dismissed2` (`Dismissed`);

--
-- Indexes for table `extrainnings1`
--
ALTER TABLE `extrainnings1`
  ADD PRIMARY KEY (`Ball_ID`);

--
-- Indexes for table `extrainnings2`
--
ALTER TABLE `extrainnings2`
  ADD PRIMARY KEY (`Ball_ID`);

--
-- Indexes for table `innings1`
--
ALTER TABLE `innings1`
  ADD PRIMARY KEY (`Ball_ID`),
  ADD KEY `fk_onstrike` (`OnStrikeID`),
  ADD KEY `fk_nonStrike` (`NonStrikeID`),
  ADD KEY `fk_currentBowler` (`CurrentBowlerID`);

--
-- Indexes for table `innings2`
--
ALTER TABLE `innings2`
  ADD PRIMARY KEY (`Ball_ID`),
  ADD KEY `fk_onstrike2nd` (`OnStrikeID`),
  ADD KEY `fk_nonStrike2nd` (`NonStrikeID`),
  ADD KEY `fk_currentBowler2nd` (`CurrentBowlerID`);

--
-- Indexes for table `player`
--
ALTER TABLE `player`
  ADD PRIMARY KEY (`PlayerID`);

--
-- Indexes for table `team`
--
ALTER TABLE `team`
  ADD PRIMARY KEY (`TeamID`),
  ADD KEY `fk_captain` (`CaptainID`);

--
-- Indexes for table `teamplayers`
--
ALTER TABLE `teamplayers`
  ADD PRIMARY KEY (`PlayerID`),
  ADD KEY `fk_teamID` (`TeamID`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `currentmatch`
--
ALTER TABLE `currentmatch`
  ADD CONSTRAINT `fk_team1` FOREIGN KEY (`Team1_ID`) REFERENCES `team` (`TeamID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_team2` FOREIGN KEY (`Team2_ID`) REFERENCES `team` (`TeamID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_toss` FOREIGN KEY (`Toss`) REFERENCES `team` (`TeamID`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `dismissalinnings1`
--
ALTER TABLE `dismissalinnings1`
  ADD CONSTRAINT `fk_ballidDismiss1` FOREIGN KEY (`Ball_ID`) REFERENCES `innings1` (`Ball_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_caughtby1` FOREIGN KEY (`CaughtBy`) REFERENCES `player` (`PlayerID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_dismissed1` FOREIGN KEY (`Dismissed`) REFERENCES `player` (`PlayerID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_fieldedby1` FOREIGN KEY (`FieldedBy`) REFERENCES `player` (`PlayerID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `dismissalinnings2`
--
ALTER TABLE `dismissalinnings2`
  ADD CONSTRAINT `fk_ballidDismiss2` FOREIGN KEY (`Ball_ID`) REFERENCES `innings2` (`Ball_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_caughtby2` FOREIGN KEY (`CaughtBy`) REFERENCES `player` (`PlayerID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_dismissed2` FOREIGN KEY (`Dismissed`) REFERENCES `player` (`PlayerID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_fieldedby2` FOREIGN KEY (`FieldedBy`) REFERENCES `player` (`PlayerID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `extrainnings1`
--
ALTER TABLE `extrainnings1`
  ADD CONSTRAINT `fk_ballidExtra1` FOREIGN KEY (`Ball_ID`) REFERENCES `innings1` (`Ball_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `extrainnings2`
--
ALTER TABLE `extrainnings2`
  ADD CONSTRAINT `fk_ballidExtra2` FOREIGN KEY (`Ball_ID`) REFERENCES `innings2` (`Ball_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `innings1`
--
ALTER TABLE `innings1`
  ADD CONSTRAINT `fk_currentBowler` FOREIGN KEY (`CurrentBowlerID`) REFERENCES `player` (`PlayerID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_nonStrike` FOREIGN KEY (`NonStrikeID`) REFERENCES `player` (`PlayerID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_onstrike` FOREIGN KEY (`OnStrikeID`) REFERENCES `player` (`PlayerID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `innings2`
--
ALTER TABLE `innings2`
  ADD CONSTRAINT `fk_currentBowler2nd` FOREIGN KEY (`CurrentBowlerID`) REFERENCES `player` (`PlayerID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_nonStrike2nd` FOREIGN KEY (`NonStrikeID`) REFERENCES `player` (`PlayerID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_onstrike2nd` FOREIGN KEY (`OnStrikeID`) REFERENCES `player` (`PlayerID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `team`
--
ALTER TABLE `team`
  ADD CONSTRAINT `fk_captain` FOREIGN KEY (`CaptainID`) REFERENCES `player` (`PlayerID`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `teamplayers`
--
ALTER TABLE `teamplayers`
  ADD CONSTRAINT `fk_playerID` FOREIGN KEY (`PlayerID`) REFERENCES `player` (`PlayerID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_teamID` FOREIGN KEY (`TeamID`) REFERENCES `team` (`TeamID`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
