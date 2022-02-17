var express = require('express');
require('dotenv').config()
var app = express();
//console.log("Hello World")

if (process.env.MESSAGE_STYLE == "uppercase") {
  app.get("/json", function (req, res) {
    res.json({ message: "HELLO JSON" });
  });
} else {
  app.get("/json", function (req, res) {
    res.json({ message: "Hello json" });
  });
}

module.exports = app;
