var config = require('./config.js');
var express = require('express');
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/' , function(req , res){
    console.log(req.query.text_get);
});

app.post('/' , function(req , res){
    console.log(req.body.text_post);
});

app.listen(config.port);