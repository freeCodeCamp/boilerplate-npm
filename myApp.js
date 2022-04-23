var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public/style.css'));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/views/index.html");
  });


 module.exports = app;
