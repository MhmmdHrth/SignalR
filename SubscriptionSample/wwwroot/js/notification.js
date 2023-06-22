var sendButton = document.getElementById("sendButton")
var notificationInput = document.getElementById("notificationInput")
var messageList = document.getElementById("messageList")
var notificationCounter = document.getElementById("notificationCounter");

//create connection
var notiConnection = new signalR.HubConnectionBuilder()
    .withUrl("/hub/notification")
    .build()

sendButton.addEventListener("click", async event => {
    var message = notificationInput.value;
    await notiConnection.send("SendMessage", message)

    notificationInput.value = ""
    event.preventDefault();
})

notiConnection.on("LoadNotification", async (messages, counter) => {
    messageList.innerHTML = "";
    notificationCounter.innerHTML = `<span>(${counter})</span>`

    for (var i = messages.length; i >= 0; i--) {
        var li = document.createElement("li");
        li.textContent = `Notification - ${messages[i]}`;
        messageList.appendChild(li);
    }
})

async function startConnection() {
    sendButton.disabled = true;
    await notiConnection.start()
    await notiConnection.send("LoadMessage")
    sendButton.disabled = false
}

try {
    startConnection();
}
catch (error) {
    console.error("Connection to User Hub Unsuccessful")
}