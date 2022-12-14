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

app.get('/chat1', (req, res) => {
    res.render('chat1.ejs');
});
app.get('/chat2', (req, res) => {
    res.render('chat2.ejs');
});
app.get('/chat3', (req, res) => {
    res.render('chat3.ejs');
});

http_socket.listen(9000);

io_socket.on('connection', function(socket){
    console.log('connected');
    socket.on('c2s', function(msg){
        io_socket.to(msg.chatid).emit('s2c', msg);
    });
    socket.on('c2s-join', function(msg){
        console.log('c2s-join:' + msg.chatid);
        socket.join(msg.chatid);
    });
});
