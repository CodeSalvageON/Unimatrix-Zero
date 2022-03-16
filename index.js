const fs = require('fs');
const express = require('express');

let app = require('express')();
let http = require('http').Server(app);
let bodyParser = require('body-parser');
let sanitizer = require('sanitizer');

let port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const Database = require("@replit/database");
const db = new Database();

let stat_data = "";

db.get("stat").then(value => {
  stat_data = value;
});

setInterval(function () { 
  db.set("stat", stat_data).then(() => {
    // Don't do anything here because it floods the console if you log anything!
  });
}, 500);

app.get('', function (req, res) {
  const index = __dirname + '/public/static/index.html';

  res.sendFile(index);
});

app.post('/stat', function (req, res) {
  const team_num = req.body.team;
  const match = req.body.match;
  const info = req.body.info;

  const clean_team_num = sanitizer.escape(team_num);
  const clean_match = sanitizer.escape(match);
  const clean_info = sanitizer.escape(info);

  if (clean_team_num === "" || clean_team_num === null || clean_team_num === undefined) {
    clean_team_num = "No team number given.";
  }

  if (clean_match === "" || clean_match === null || clean_match === undefined) {
    clean_match = "No match given.";
  }
  
  if (clean_info === "" || clean_info === null || clean_info === undefined) {
    clean_info = "No information given.";
  }

  stat_data = "<b>Team Name: " + clean_team_num + "</b><p>Match info: " + clean_match + "</p><hr/><p>Info gained: " + clean_info + "</p>" + stat_data;
  
  console.log("done!");
  res.send("success!");
});

app.get('/stat', function (req, res) {
  res.send(stat_data);
});

let chatbox = "";

app.post('/chat', function (req, res) {
  const chat_user = req.body.user;
  const msg = req.body.msg;

  const clean_user = sanitizer.escape(chat_user);
  const clean_msg = sanitizer.escape(msg);

  chatbox = "<b>" + clean_user + "</b><hr><p>" + clean_msg + "</p>" + chatbox;
  res.send("success!");
});

app.get('/chat', function (req, res) {
  res.send(chatbox);
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});