var message = document.getElementById("message");
var button = document.getElementById("send");
var username = document.getElementById("username");
var output = document.getElementById("output");

const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7154/chatHub", {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
    })
    .configureLogging(signalR.LogLevel.Information)
    .build();

connection.start().then(function () {
    console.log("SignalR Connected.");
}).catch(function (err) {
    return console.error(err.toString());
});

button.addEventListener("click", function(){
    console.log("SEND DATA");
    connection.invoke("SendMessage", username.value, message.value).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
})

connection.on("ReceiveMessage", function (user, message) {
    output.innerHTML += 
        '<p><strong>' + user + ': </strong>' + message  + '</p>';
 
});


/*socket.on("broadcastMessage", function(data) {
    console.log(data);
    output.innerHTML += 
        '<p><strong>' + data.username + ': </strong>' + data.message  + '</p>';
});*/