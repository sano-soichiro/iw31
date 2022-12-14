"use strict"
var config = require('./config.js');
var express = require('express');
var app = express();

// ejs使用時に必要
app.set("view engine","ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/views" , { index: false}));
app.use(express.static(__dirname + "/public" , { index: false}));

app.get("/app4-2" , function (req , res){
    res.render("index4-2.ejs",
        {value1:'<h2>HAL</h2>',
        value2:'大阪',
        header:'<p>------header------</p>',
        footer:'<p>------footer------</p>'});
});

var count = 0;
app.get("/app4-3" , function (req , res){
    res.render("index4-3.ejs",
        {value1:'<h2>HAL</h2>',
        value2:'大阪',
        header:'<p>------header------</p>',
        footer:'<p>------footer------</p>',
        count:'現在このページには'+count+'回訪れています。'});
        count++;
});

app.listen(config.port);