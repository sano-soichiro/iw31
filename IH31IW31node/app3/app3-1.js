var config = require('./config.js');
var express = require('express');
var app = express();
app.get('/', function (req , res) {
    res.send('Hello Express!');
});
app.listen(config.port);