const express = require('express');
const socket = require('socket.io');
const app = express();

var server = app.listen(4000, function() {
    console.log('listening to port 4000');
});

app.use(express.static("public"));


var upgradedServer = socket(server);

upgradedServer.on("connection", function(socket){

    socket.on('sendingMessage', function(data) {
        console.log(data);
        upgradedServer.emit('broadcastMessage', data);
    });

    console.log('Websocket connected', socket.id);
});
