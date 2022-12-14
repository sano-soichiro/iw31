const socketio = io();
const form = document.getElementById("chatForm");

form.addEventListener("submit" , function (event) {
    event.preventDefault();

    let sendData = {
        chatid : "3",
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
    chatid:'3'
}
socketio.emit('c2s-join', sendData);
