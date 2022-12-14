"use strict"

const express = require('express');
const app = express();
const http_socket = require('http').Server(app);
const io_socket = require('socket.io')(http_socket);

app.set('view engine' , 'ejs');

app.use(express.static(__dirname+"/views" , { index: false }));
app.use(express.static(__dirname+"/public" , { index: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/' , (req , res) => {
    res.render('index.ejs');
});

http_socket.listen(9000);

// クライアントからの接続
io_socket.on('connection' , function(socket){
    console.log('connected');

    // クライアント（ブラウザ）→サーバ（Node.js）へSocket通信
    socket.on('c2s' , function(msg){
        console.log('c2s: ' + msg);
        // サーバ（Node.js）→クライアント（ブラウザ）へSocket通信
        io_socket.emit('s2c' , msg);
    });
});