"use strict"

const socketio = io();

let form = document.getElementById("chatForm");

form.addEventListener("submit" , function (event) {

    event.preventDefault();

    let sendData = {
        id : id,
        username : document.getElementById("username").value,
        message : document.getElementById("message").value
    };
    socketio.emit('c2s' , sendData);
});

socketio.on('s2c' , function (msg) {
    let ul = document.getElementById("output");
    let li = document.createElement('li');
    li.innerHTML = msg.id + "    " + msg.username + "    " + msg.message;
    ul.appendChild(li);
});

