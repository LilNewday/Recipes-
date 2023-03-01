DROP DATABASE IF EXISTS userinfo_db;

CREATE DATABASE userinfo_db;

USE userinfo_db;

CREATE TABLE loginInfo (
userName VARCHAR(30) NOT NULL,
password VARCHAR(200) NOT NULL
);

INSERT INTO loginInfo (userName, password)
  VALUES ('AndrewL', 'Abc123!!');
