var express = require('express');
require('dotenv').config()
var app = express();
const dotenv = require("dotenv")
dotenv.config()
//console.log("Hello World")

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.use("/public", express.static(__dirname + "/public"));

app.get("/json", (req, res) => {
  res.json({
    message: "Hello json"
  });
});

app.get('/json',(req,res)=>{
  if(process.env.MESSAGE_STYLE==="uppercase"){
res.json({
"message":"HELLO JSON"
})
  }else{
    res.json({
      "message":"Hello json"
    })
  }
})

// const mySecret = process.env['MESSAGE_STYLE'];
// console.log(mySecret);

// if (process.env.MESSAGE_STYLE == "uppercase") {
//   app.get("/json", (req, res) => {
//     res.json({ message: "HELLO JSON" });
//   });
// } else {
//   app.get("/json", (req, res) => {
//     res.json({ message: "Hello json" });
//   });
// }
module.exports = app;

