CREATE DATABASE [IF NOT EXISTS]  CRICLIVE;

CREATE TABLE TEAM(
    TeamID INT NOT NULL PRIMARY key,
    TeamName VARCHAR,
    Country VARCHAR,
    Coach VARCHAR,
    CaptainID INT);

CREATE TABLE PLAYER(
    PlayerID INT NOT NULL PRIMARY KEY,
    PlayerName Varchar,
    PlayerType Varchar,
    DateofBirth date,
    TeamID INT,
    CONSTRAINT fk_country FOREIGN KEY (TeamID)
    REFERENCES TEAM(TeamID)
    ON DELETE SET NULL
    ON UPDATE CASCADE 
);

CREATE TABLE CURRENTMATCH(
    Team1_ID INT,
    Team2_ID INT,
    Date DATE,
    Time TIME,
    Venue VARCHAR,
    Toss INT,
    PRIMARY KEY (Team1_ID, Team2_ID, Date),
    CONSTRAINT fk_team1 FOREIGN KEY (Team1_ID)
    REFERENCES TEAM(TeamID)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    CONSTRAINT fk_team2 FOREIGN KEY (Team2_ID)
    REFERENCES TEAM(TeamID)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    CONSTRAINT fk_toss FOREIGN KEY (Toss)
    REFERENCES TEAM(TeamID)
    ON DELETE SET NULL
    ON UPDATE CASCADE 
    );

CREATE TABLE BALL(
    Ball_ID INT NOT NULL PRIMARY KEY,
    Over INT,
    BallNumber INT,
    Economy FLOAT,
    RunsScored INT,
    CurrentRR FLOAT,
    RequiredRR FLOAT,
    OnStrikeID INT,
    NonStrikeID INT,
    CurrentBowlerID INT,
    CONSTRAINT fk_onstrike FOREIGN KEY (OnStrikeID)
    REFERENCES PLAYER(PlayerID)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    CONSTRAINT fk_team2 FOREIGN KEY (NonStrikeID)
    REFERENCES PLAYER(PlayerID)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    CONSTRAINT fk_toss FOREIGN KEY (CurrentBowlerID)
    REFERENCES PLAYER(PlayerID)
    ON DELETE CASCADE
    ON UPDATE CASCADE 
);

CREATE TABLE EXTRA(
    Ball_ID INT NOT NULL PRIMARY KEY,
    Type Varchar,
    ExtraRuns INT,
    CONSTRAINT fk_ballid FOREIGN KEY (Ball_ID)
    REFERENCES BALL(Ball_ID)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE DISMISSAL(
    Ball_ID INT NOT NULL PRIMARY KEY,
    DismissType VARCHAR,
    CaughtBy INT,
    StumpedBy INT,
    FieldedBy INT,
    Dismissed INT,
    Retired INT,
    CONSTRAINT fk_caughtby FOREIGN KEY (CaughtBy)
    REFERENCES PLAYER(PlayerID)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    CONSTRAINT fk_stumpedby FOREIGN KEY (StumpedBy)
    REFERENCES PLAYER(PlayerID)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    CONSTRAINT fk_fieldedby FOREIGN KEY (FieldedBy)
    REFERENCES PLAYER(PlayerID)
    ON DELETE CASCADE
    ON UPDATE CASCADE, 
    CONSTRAINT fk_dismissed FOREIGN KEY (Dismissed)
    REFERENCES PLAYER(PlayerID)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    CONSTRAINT fk_retired FOREIGN KEY (Retired)
    REFERENCES PLAYER(PlayerID)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    CONSTRAINT fk_ballid FOREIGN KEY (Ball_ID)
    REFERENCES BALL(Ball_ID)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

ALTER TABLE TEAM  
    ADD fk_captain FOREIGN KEY(CaptainID)  
    REFERENCES PLAYER(PlayerID)  
    ON DELETE SET NULL  
    ON UPDATE CASCADE; 