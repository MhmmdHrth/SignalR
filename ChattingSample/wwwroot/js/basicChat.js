var sendMessage = document.getElementById("sendMessage")
var senderEmail = document.getElementById("senderEmail")
var senderMessage = document.getElementById("chatMessage")
var receiverEmail = document.getElementById("receiverEmail")

var chatConnection = new signalR.HubConnectionBuilder()
    .withAutomaticReconnect()
    .withUrl("/hub/basicChat")
    .build()

sendMessage.addEventListener("click", async event => {

    receiverEmail.value.length > 0 ? await chatConnection.send("SendMessageToReceiver", senderEmail.value, receiverEmail.value, senderMessage.value) :
                               await chatConnection.send("SendMessageToAll", senderEmail.value, senderMessage.value)
    event.preventDefault()
})

async function startConnection() {
    sendMessage.disabled = true
    await chatConnection.start()
    sendMessage.disabled = false
}

try {
    startConnection();
}
catch (error) {
    console.error("Connection to Chat Hub Unsuccessful")
}

chatConnection.on("MessageReceived", (user, message) => {
    var li = document.createElement("li");
    li.textContent = `${user} - ${message}`;
    document.getElementById("messagesList").appendChild(li);
})

chatConnection.onclose(error => {
    console.error("error", error)
    document.body.style.background = "red"
})

chatConnection.onreconnected(connectionId => {
    console.error("connectionId", connectionId)
    document.body.style.background = "green"
})

chatConnection.onreconnecting(x => {
    console.error("x", x)
    document.body.style.background = "orange"
})