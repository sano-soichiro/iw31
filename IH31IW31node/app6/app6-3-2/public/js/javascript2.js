"use strict"

const socketio = io();

let form = document.getElementById("chat2Form");

form.addEventListener("submit" , function (event) {

    event.preventDefault();

    let sendData = {
        id : id,
        username : document.getElementById("chat2-username").value,
        message : document.getElementById("chat2-message").value
    };
    socketio.emit('c2s-chat2' , sendData);
});

socketio.on('s2c-chat2' , function (msg) {
    let ul = document.getElementById("output");
    let li = document.createElement('li');
    li.innerHTML = msg.id + "    " + msg.username + "    " + msg.message;
    ul.appendChild(li);
});

