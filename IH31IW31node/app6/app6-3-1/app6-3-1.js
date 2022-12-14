"use strict"
const express = require('express');
const app = express();
const http_socket = require('http').Server(app);
const io_socket = require('socket.io')(http_socket);

app.set('view engine', 'ejs');

app.use(express.static(__dirname+"/views", { index: false }));
app.use(express.static(__dirname+"/public", { index: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    database: 'testdb'
});

connection.connect((error) => {
    if (error) {
        console.log('error connecting: ' + error.stack);
        return;
    }
    console.log('success');
});

const passport = require('passport');
app.use(passport.initialize());

const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    function(email, password, done) {
        const values = [
            email,
            password
        ];
        connection.query(
            'SELECT * FROM t01_users WHERE email=? AND password=?', values,
            (error, results) => {
                if(error) {
                    console.log('error connecting: ' + error.stack);
                    return;
                }
                const count = results.length;
                if(count == 0) {
                    return done(null, false); //NG
                }else{
                    return done(null, results[0]); //OK
                }
            }
        );
    }
));

app.get('/', (req, res) => {
    connection.query(
        'SELECT * FROM t01_users',
        (error, results) => {
            if (error) {
                console.log('error connecting: ' + error.stack);
                res.status(400).send({ message: 'Error!!' });
                return;
            }
            res.render('index.ejs', {values:results});
        }
    );
});

app.get('/login', function(req, res){
    res.render('login.ejs');
});

app.get('/error', function(req, res){
    res.render('error.ejs');
});

app.post('/login', 
    passport.authenticate('local', {
        session: false,
        // successRedirect : '/chat',
        failureRedirect : '/error'
    }),
    function(req ,res){
        res.render('success.ejs');
    }
);

http_socket.listen(9000);