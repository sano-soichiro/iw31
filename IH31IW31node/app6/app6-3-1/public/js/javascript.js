"use strict"

const socketio = io();

window.onload = function(){
    let ul = document.getElementById("output");
    console.log(data);

    for (let i = 0; i < data.length; i++){
        if ((i + 1) % 3 === 0){
            let li = document.createElement('li');
            li.innerHTML = data[i - 1].input1 + "    " + data[i].input2;
            ul.appendChild(li);
        }
    }
}

const form = document.getElementById("chatForm");

form.addEventListener("submit" , function (event) {

    event.preventDefault();

    let sendData = {
        chatid : chatid,
        input1 : document.getElementById("chat-input1").value,
        input2 : document.getElementById("chat-input2").value
    }
    socketio.emit('c2s' , sendData);
});

socketio.on('s2c' , function (msg) {
    let ul = document.getElementById("output");
    let li = document.createElement('li');
    li.innerHTML = msg.input1 + "    " + msg.input2;
    ul.appendChild(li);
});

const sendData = {
    chatid : chatid
}
socketio.emit('c2s-join', sendData);
