var dotenv = require('dotenv');
var mongoodb = require('mongodb');
var mongoose = require('mongoose');

require('dotenv').config();

const URI = process.env.MONGO_URI;
console.log(URI, process.env.MESSAGE_STYLE);

mongoose.connect(URI);
