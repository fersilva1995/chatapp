var socket = io.connect("http://localhost:4000")

var message = document.getElementById("message");
var button = document.getElementById("send");
var username = document.getElementById("username");
var output = document.getElementById("output");
console.log(button, username, output);

button.addEventListener("click", function(){
    console.log("SEND DATA");
    socket.emit('sendingMessage', { 
        message: message.value, 
        username: username.value
    });
})


socket.on("broadcastMessage", function(data) {
    console.log(data);
    output.innerHTML += 
        '<p><strong>' + data.username + ': </strong>' + data.message  + '</p>';
});