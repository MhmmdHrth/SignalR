var advChat = new signalR.HubConnectionBuilder()
    .withAutomaticReconnect([0, 1000, 5000, 10000])
    .withUrl("/hub/chat")
    .build()

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

advChat.on("ReceiveAddRoomMessage", (maxRoom, roomId, roomName, userId, username) => {
    toastr.success(`${username} has created room ${roomName}`)
})
advChat.on("ReceiveDeleteRoomMessage", (deleted, selected, roomName, username) => {
    toastr.success(`${username} has deleted room ${roomName}`)
})
advChat.on("ReceivePublicMessage", (roomId, message, roomName, userName) => {
    addMessage(`[Public Message - ${roomName}] ${userName} says ${message}`)
})
advChat.on("ReceivePrivateMessage", (senderId, userName, message) => {
    let userId = document.getElementById("hdUserId").value
    let senderText = senderId == userId ? "you" : userName

    addMessage(`[${senderText}] - ${message}`)
})

advChat.onclose(error => {
    
})

advChat.onreconnected(connectionId => {
    
})

advChat.onreconnecting(x => {
    
})

function addnewRoom(maxRoom) {

    let createRoomName = document.getElementById('createRoomName');
    var roomName = createRoomName.value;
    if (roomName == null && roomName == '') {
        return;
    }

    $.ajax({
        url: '/chatrooms/postchatroom',
        dataType: "json",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({ id: 0, name: roomName }),
        async: true,
        processData: false,
        cache: false,
        success: (json) => {
            advChat.invoke("sendAddRoomMessage", maxRoom, json.id, json.name);
            createRoomName.value = '';
            fillRoomDropDown()
        },
        error: (xhr) => {
            alert('error');
        }
    })
}

function deleteRoom() {

    let ddlDelRoom = document.getElementById('ddlDelRoom');
    var roomName = ddlDelRoom.options[ddlDelRoom.selectedIndex].text;
    if (roomName == null && roomName == '') {
        return;
    }

    let roomId = ddlDelRoom.value

    $.ajax({
        url: `/chatrooms/DeleteChatRoom/${roomId}`,
        dataType: "json",
        type: "DELETE",
        contentType: 'application/json;',
        async: true,
        processData: false,
        cache: false,
        success: (json) => {
            advChat.invoke("sendDeleteRoomMessage", json.deleted, json.selected, roomName);
            fillRoomDropDown()
        },
        error: (xhr) => {
            alert('error');
        }
    })
}


document.addEventListener('DOMContentLoaded', (event) => {
    fillRoomDropDown();
    fillUserDropDown();
})


function fillUserDropDown() {

    $.getJSON('/chatrooms/GetChatUsers')
        .done((json) => {

            var ddlSelUser = document.getElementById("ddlSelUser");
            ddlSelUser.innerText = null;

            json.forEach((item) => {
                var newOption = document.createElement("option");

                newOption.text = item.userName;
                newOption.value = item.id;
                ddlSelUser.add(newOption);
            });
        })
        .fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.log("Request Failed: " + jqxhr.detail);
        });

}

function fillRoomDropDown() {

    $.getJSON('/ChatRooms/GetChatRooms')
        .done((json) => {
            var ddlDelRoom = document.getElementById("ddlDelRoom");
            var ddlSelRoom = document.getElementById("ddlSelRoom");

            ddlDelRoom.innerText = null;
            ddlSelRoom.innerText = null;

            json.forEach(function (item) {
                var newOption = document.createElement("option");

                newOption.text = item.name;
                newOption.value = item.id;
                ddlDelRoom.add(newOption);

                var newOption1 = document.createElement("option");

                newOption1.text = item.name;
                newOption1.value = item.id;
                ddlSelRoom.add(newOption1);

            });

        })
        .fail((jqxhr, textStatus, error) => {
            var err = textStatus + ", " + error;
            console.log("Request Failed: " + jqxhr.detail);
        });
};

function sendPublicMessage() {
    let inputmsg = document.getElementById("txtPublicMessage")
    let ddlSelRoom = document.getElementById("ddlSelRoom")

    let roomId = ddlSelRoom.value;
    let roomName = ddlSelRoom.options[ddlSelRoom.selectedIndex].text
    let message = inputmsg.value;

    advChat.send("SendPublicMessage", Number(roomId), message, roomName)

    inputmsg.value = ""
}

function sendPrivateMessage() {
    let inputmsg = document.getElementById("txtPrivateMessage")
    let ddlSelUser = document.getElementById("ddlSelUser")

    let receiverId = ddlSelUser.value;
    let receiverName = ddlSelUser.options[ddlSelUser.selectedIndex].text
    let message = inputmsg.value;

    advChat.send("SendPrivateMessage", receiverId, receiverName, message)
    inputmsg.value = ""
}

function addMessage(message) {
    var li = document.createElement("li");
    li.textContent = message;
    document.getElementById("messagesList").appendChild(li);
}
