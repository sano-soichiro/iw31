"use strict"

const socketio = io();

let form = document.getElementById("chat1Form");

form.addEventListener("submit" , function (event) {

    event.preventDefault();

    let sendData = {
        id : id,
        username : document.getElementById("chat1-username").value,
        message : document.getElementById("chat1-message").value
    };
    socketio.emit('c2s-chat1' , sendData);
});

socketio.on('s2c-chat1' , function (msg) {
    let ul = document.getElementById("output");
    let li = document.createElement('li');
    li.innerHTML = msg.id + "    " + msg.username + "    " + msg.message;
    ul.appendChild(li);
});

