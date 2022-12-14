"use strict"
const express = require('express');
const mysql = require('mysql');

const app = express();
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
    database: 'testdb'
});

connection.connect((err) => {
    if (err) {
        console.log('error connecting: ' + err.stack);
        return;
    }
    console.log('success');
});

app.get('/' , (req , res) => {
    connection.query(
        'SELECT * FROM t01_users',
        (error , results) => {
            if (error) {
                console.log('error connecting: ' + error.stack);
                return;
            }
            console.log(results);
            res.render('index.ejs',{values:results});
        }
    );
});

app.post('/users' , (req , res) => {
    connection.query(
        "INSERT INTO t01_users VALUES ('999' , 'haru@hal.ac.jp' , '春太郎' , 'test');",
        (error , results) => {
            if (error) {
                console.log('error connecting: ' + error.stack);
                res.send(error.stack);
                return;
            }
            res.render('test.ejs');
        }
    );
});

app.delete('/users' , (req , res) => {
    connection.query(
        "DELETE FROM t01_users WHERE id='999';",
        (error , results) => {
            if (error) {
                console.log('error connecting: ' + error.stack);
                res.send(error.stack);
                return;
            }
            res.render('test.ejs');
        }
    );
});

app.put('/users' , (req , res) => {
    connection.query(
        "UPDATE t01_users SET password='12345',email='haru@hal.ac.jp' WHERE id='999';",
        (error , results) => {
            if (error) {
                console.log('error connecting: ' + error.stack);
                res.send(error.stack);
                return;
            }
            console.log(results);
            res.render('test.ejs');
        }
    );
});

app.get('/users/:id' , (req , res) => {
    let values = [
        't01_users',
        req.params.id
    ];
    connection.query(
        'SELECT * FROM ?? WHERE id=?;', values,
        (error , results) => {
            if(error) {
                console.log('error connecting: ' + error.stack);
                return;
            }
            console.log(results);
            res.send(results);
        }
    );
});

app.put('/users/:id',(req , res) => {
    let values = [
        req.body.email,
        req.body.username,
        req.body.password,
        req.params.id
    ];

    connection.query(
        'UPDATE t01_users SET email=? , username=? , password=?  WHERE id=?;', values,
        (error , results) => {
            if(error) {
                console.log('error connecting: ' + error.stack);
                res.status(400).send({ message: 'Error!!' });
                return;
            }
            console.log(results);
            res.render('test.ejs');
        }
    );
});

app.listen(9000);