//create connection
var connection = new signalR.HubConnectionBuilder()
    .withUrl("/hubs/userCount")
    .build()

//connect to methods that hub client create
connection.on("updateTotalViews", value => {
    var newCountSpan = document.getElementById("totalViewsCounter")
    newCountSpan.innerHTML = value.toString()
})

connection.on("updateTotalUsers", value => {
    var newCountSpan = document.getElementById("totalUsersCounter")
    newCountSpan.innerHTML = value.toString()
})

//start connection
async function startConnection() {
    await connection.start()
    console.info("Connection to User Hub Successful")

    var response = await connection.invoke("NewWindowLoaded")
    console.info(response)
}

try {
    startConnection();
}
catch (error) {
    console.error("Connection to User Hub Unsuccessful")
}