/// <reference path="signalr.js" />

var cloakCountSpan = document.getElementById("cloakCounter")
var stoneCountSpan = document.getElementById("stoneCounter")
var wandCountSpan = document.getElementById("wandCounter")

//create connection
var connectionHallow = new signalR.HubConnectionBuilder()
    .withUrl("/hubs/deathlyhallows")
    .build()

//connect to methods that hub client create
connectionHallow.on("updateDeathlyHallowCount", (cloak,stone,wand) => {
    cloakCountSpan.innerHTML = cloak.toString()
    stoneCountSpan.innerHTML = stone.toString()
    wandCountSpan.innerHTML = wand.toString()
})

//start connection
async function startConnection() {
    await connectionHallow.start()

    var response = await connectionHallow.invoke("GetRaceStatus")
    cloakCountSpan.innerHTML = response.cloak.toString()
    stoneCountSpan.innerHTML = response.stone.toString()
    wandCountSpan.innerHTML = response.wand.toString()
}

try {
    startConnection();
}
catch (error) {
    console.error("Connection to User Hub Unsuccessful")
}