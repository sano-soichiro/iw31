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

app.get("/app4-1" , function (req , res){
    res.render("index4-1.ejs",
        {value1:'<h2>HAL</h2>',
        value2:'大阪'});
})

app.listen(config.port);