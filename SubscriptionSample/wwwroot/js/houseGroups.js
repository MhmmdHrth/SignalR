let lbl_houseJoined = document.getElementById("lbl_houseJoined");

let btn_un_gryffindor = document.getElementById("btn_un_gryffindor");
let btn_un_slytherin = document.getElementById("btn_un_slytherin");
let btn_un_hufflepuff = document.getElementById("btn_un_hufflepuff");
let btn_un_ravenclaw = document.getElementById("btn_un_ravenclaw");
let btn_gryffindor = document.getElementById("btn_gryffindor");
let btn_slytherin = document.getElementById("btn_slytherin");
let btn_hufflepuff = document.getElementById("btn_hufflepuff");
let btn_ravenclaw = document.getElementById("btn_ravenclaw");

let trigger_gryffindor = document.getElementById("trigger_gryffindor");
let trigger_slytherin = document.getElementById("trigger_slytherin");
let trigger_hufflepuff = document.getElementById("trigger_hufflepuff");
let trigger_ravenclaw = document.getElementById("trigger_ravenclaw");

//create connection
var groupConnection = new signalR.HubConnectionBuilder()
    .withUrl("/hub/groupHub")
    .build()

//subscribe
btn_gryffindor.addEventListener("click", event => {
    console.error("adssad")
    groupConnection.send("JoinGroup", "Gryffindor")
    console.error("asassssssssss")
    event.preventDefault();
})
btn_slytherin.addEventListener("click", event => {
    groupConnection.send("JoinGroup", "Slytherin")
    event.preventDefault();
})
btn_hufflepuff.addEventListener("click", event => {
    groupConnection.send("JoinGroup", "Hufflepuff")
    event.preventDefault();
})
btn_ravenclaw.addEventListener("click", event => {
    groupConnection.send("JoinGroup", "Ravenclaw")
    event.preventDefault();
})

//unsubscribe
btn_un_gryffindor.addEventListener("click", event => {
    groupConnection.send("LeaveGroup", "Gryffindor")
    event.preventDefault();
})
btn_un_slytherin.addEventListener("click", event => {
    groupConnection.send("LeaveGroup", "Slytherin")
    event.preventDefault();
})
btn_un_hufflepuff.addEventListener("click", event => {
    groupConnection.send("LeaveGroup", "Hufflepuff")
    event.preventDefault();
})
btn_un_ravenclaw.addEventListener("click", event => {
    groupConnection.send("LeaveGroup", "Ravenclaw")
    event.preventDefault();
})

//trigger
trigger_gryffindor.addEventListener("click", event => {
    groupConnection.send("TriggerGroupNotify", "Gryffindor")
    event.preventDefault();
})
trigger_slytherin.addEventListener("click", event => {
    groupConnection.send("TriggerGroupNotify", "Slytherin")
    event.preventDefault();
})
trigger_hufflepuff.addEventListener("click", event => {
    groupConnection.send("TriggerGroupNotify", "Hufflepuff")
    event.preventDefault();
})
trigger_ravenclaw.addEventListener("click", event => {
    groupConnection.send("TriggerGroupNotify", "Ravenclaw")
    event.preventDefault();
})

groupConnection.on("subscriptionStatus", (strGroupsJoined, groupName, hasSubscribed) => {
    lbl_houseJoined.innerHTML = strGroupsJoined;

    if (hasSubscribed) {
        switch (groupName) {
            case "gryffindor": {
                btn_gryffindor.style.display = "None";
                btn_un_gryffindor.style.display = "";
                break;
            }
            case "slytherin": {
                btn_slytherin.style.display = "None";
                btn_un_slytherin.style.display = "";
                break;
            }
            case "hufflepuff": {
                btn_hufflepuff.style.display = "None";
                btn_un_hufflepuff.style.display = "";
                break;
            }
            case "ravenclaw": {
                btn_ravenclaw.style.display = "None";
                btn_un_ravenclaw.style.display = "";
                break;
            }
        }

        toastr.success(`You have subscribe ${groupName}`);
    }
    else {
        switch (groupName) {
            case "gryffindor": {
                btn_gryffindor.style.display = "";
                btn_un_gryffindor.style.display = "None";
                break;
            }
            case "slytherin": {
                btn_slytherin.style.display = "";
                btn_un_slytherin.style.display = "None";
                break;
            }
            case "hufflepuff": {
                btn_hufflepuff.style.display = "";
                btn_un_hufflepuff.style.display = "None";
                break;
            }
            case "ravenclaw": {
                btn_ravenclaw.style.display = "";
                btn_un_ravenclaw.style.display = "None";
                break;
            }
        }

        toastr.success(`You have unsubscribe ${groupName}`);
    }
})
groupConnection.on("sentNotification", (groupName, isSubscribe) => {

    isSubscribe ? toastr.success(`Member have subscribe ${groupName}`) :
                  toastr.warning(`Member have unsubscribe ${groupName}`)
})

groupConnection.on("triggerGroupNotification", groupName => {
    toastr.success(`A new notification for ${groupName}`)
})

async function startConnection() {
    await groupConnection.start()
}

try {
    startConnection();
}
catch (error) {
    console.error("Connection to User Hub Unsuccessful")
}