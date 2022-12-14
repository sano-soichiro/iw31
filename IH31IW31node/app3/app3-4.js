var config = require('./config.js');
var express = require('express');
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/views" , { index: false}));
app.use(express.static(__dirname + "/public" , { index: false}));


/**
 * req: 受信
 * res: 送信
 * ---------------------------------------------------
 * GET通信: query
 * GET以外の通信: body
 */
app.get('/' , function(req , res){
    console.log(req.query.text_get);
    res.sendFile(__dirname + "/views/index.html");
});

app.post('/' , function(req , res){
    console.log(req.body.text_post);
    res.sendFile(__dirname + "/views/index.html");
});

app.listen(config.port);