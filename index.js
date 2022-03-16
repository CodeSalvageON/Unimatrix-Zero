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

app.get('', function (req, res) {
  const index = __dirname + '/public/static/index.html';

  res.sendFile(index);
});

app.post('/stat', function (req, res) {
  const team_num = req.body.team;
  const match = req.body.match;
  const info = req.body.info;
});

let chatbox = "";

app.post('/chat', function (req, res) {
  const chat_user = req.body.user;
  const msg = req.body.msg;

  const clean_user = sanitizer.escape(chat_user);
  const clean_msg = sanitizer.escape(msg);
});

app.get('/chat', function (req, res) {
  res.send(chatbox);
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});