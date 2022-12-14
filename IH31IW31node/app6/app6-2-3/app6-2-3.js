"use strict"

const express = require('express');
const mysql = require('mysql');
const app = express();
const http_socket = require('http').Server(app);
const io_socket = require('socket.io')(http_socket);

app.set('view engine' , 'ejs');

app.use(express.static(__dirname+"/views" , { index: false }));
app.use(express.static(__dirname+"/public" , { index: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: '3306',
    database: 'chatdb'
});

connection.connect((err) => {
    if (err) {
        console.log('error connecting: ' + err.stack);
        return;
    }
    console.log('success');
});

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/chat/:chatid', (req, res) => {

    connection.query(
        'SELECT * FROM t01_chatmessage;',
        (error, results) => {
            if (error) {
                console.log('error connecting: ' + error.stack);
                res.status(400).send({ message: 'Error!' });
                return;
            }
            console.log('a');
            const data = results.filter(log => log.chatid === req.params.chatid);
            const ary = [];
            for (let i = 0; i < data.length; i++) {
                ary[i] = [data[i].chatid, data[i].input1, data[i].input2];
            }
            console.log(ary);
            res.render('chat.ejs' , 
            {
                chatid : req.params.chatid,
                data : ary
            });
        }
    );
});

http_socket.listen(9000);

io_socket.on('connection', function(socket){
    console.log('connected');
    socket.on('c2s', function(msg){

        let values = [
            msg.chatid,
            msg.input1,
            msg.input2
        ];
    
        connection.query(
            'INSERT INTO t01_chatmessage VALUES (?,?,?);', values,
            (error, results) => {
                if (error) {
                    console.log('error connecting: ' + error.stack);
                    return;
                }
                console.log(values);
            }
        );

        io_socket.to(msg.chatid).emit('s2c', msg);
    });
    socket.on('c2s-join', function(msg){
        console.log('c2s-join:' + msg.chatid);
        socket.join(msg.chatid);
    });
});
