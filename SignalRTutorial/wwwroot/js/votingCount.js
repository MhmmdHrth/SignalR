/// <reference path="signalr.js" />

var pnCountSpan = document.getElementById("pnCounter")
var phCountSpan = document.getElementById("phCounter")
var bnCountSpan = document.getElementById("bnCounter")

//create connection
var votingConnection = new signalR.HubConnectionBuilder()
    .withUrl("/hubs/votingCount")
    .build()

//connect to methods that hub client create
votingConnection.on("updateVotingCount", value => {
    pnCountSpan.innerHTML = value.pn.toString()
    phCountSpan.innerHTML = value.ph.toString()
    bnCountSpan.innerHTML = value.bn.toString()
})

//start connection
async function startConnection() {
    await votingConnection.start()

    var response = await votingConnection.invoke("GetVotingCount")
    pnCountSpan.innerHTML = response.pn.toString()
    phCountSpan.innerHTML = response.ph.toString()
    bnCountSpan.innerHTML = response.bn.toString()
}

try {
    startConnection();
}
catch (error) {
    console.error("Connection to User Hub Unsuccessful")
}