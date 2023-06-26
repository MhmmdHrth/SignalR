//var sendMessage = document.getElementById("sendMessage")
//var senderEmail = document.getElementById("senderEmail")
//var senderMessage = document.getElementById("chatMessage")
//var receiverEmail = document.getElementById("receiverEmail")

var advChat = new signalR.HubConnectionBuilder()
    .withAutomaticReconnect([0, 1000, 5000, 10000])
    .withUrl("/hub/chat")
    .build()

//sendMessage.addEventListener("click", async event => {

//    event.preventDefault()
//})

async function startConnection() {
    await advChat.start()
}

try {
    startConnection();
}
catch (error) {
    console.error("Connection to Chat Hub Unsuccessful")
}

advChat.on("ReceiveUserConnection", (username, isOldConnection, isDisconnected) => {
    if (!isOldConnection)
        toastr.success(`${username} is online`)

    if (isDisconnected)
        toastr.error(`${username} is offline`)
})

advChat.onclose(error => {
    
})

advChat.onreconnected(connectionId => {
    
})

advChat.onreconnecting(x => {
    
})