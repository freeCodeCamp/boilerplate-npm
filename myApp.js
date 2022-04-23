var express = require('express');
var app = express();
var dotenv = require('dotenv');

require('dotenv').config();

// Normal usage
app.use(express.static(__dirname + "/public"));

// Assets at the /public route
app.use("/public", express.static(__dirname + "/public"));


app.get("/", function(req, res) {
    res.sendFile(__dirname + "/views/index.html");
  });

app.get('/json', function(req, res) {
    const message = {'message': 'Hello json'} 
    if (process.env.MESSAGE_STYLE == 'uppercase') {
        return res.json(message.toUpperCase());
    }
    else {
        return res.json(message);
    }
});


 module.exports = app;
