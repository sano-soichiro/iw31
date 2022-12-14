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

app.get('/app4-4-1/:val1' , function( req , res ) {
    console.log(req.params.val1);
    res.render('page2.ejs',
        {name:req.params.val1});
});

app.get('/app4-4-1/:val1/:val2' , function( req , res ) {
    console.log(req.params.val1);
    console.log(req.params.val2);
    res.render('page2.ejs',
        {name:req.params.val1+req.params.val2});
});

const users = ["あさだ" , "ながみね" , "かわた" , "かわしま"];
app.get('/app4-4-2/:val1' , function( req , res ) {
    console.log(req.params.val1);
    if (req.params.val1 < 0 || req.params.val1 > 3){
        var name = 'NoName';
    } 
    else {
        var name = users[req.params.val1];
    }
    res.render('page2.ejs',
        {name:name});
});

app.get('/app4-5' , function(req , res){
    res.render('page3.ejs');
})

app.get('/users' , function(req , res){
    console.log("GET:"+req.query.name);
    let senddata = {
        name: req.query.name
    }
    res.send(JSON.stringify(senddata));
})

app.post('/users' , function(req , res){
    console.log("GET:"+req.body.name);
    let senddata = {
        name: req.query.name
    }
    res.send(JSON.stringify(senddata));
})

app.put('/users' , function(req , res){
    console.log("GET:"+req.body.name);
    let senddata = {
        name: req.query.name
    }
    res.send(JSON.stringify(senddata));
})

app.delete('/users' , function(req , res){
    console.log("GET:"+req.body.name);
    let senddata = {
        name: req.query.name
    }
    res.send(JSON.stringify(senddata));
})

app.listen(config.port);