var dataTable;
var orderConnection = new signalR.HubConnectionBuilder()
    .withUrl("/hub/order")
    .build()

$(document).ready(function () {
    loadDataTable();
});

function loadDataTable() {

    dataTable = $('#tblData').DataTable({
        "ajax": {
            "url": "/Home/GetAllOrder"
        },
        "columns": [
            { "data": "id", "width": "5%" },
            { "data": "name", "width": "15%" },
            { "data": "itemName", "width": "15%" },
            { "data": "count", "width": "15%" },
            {
                "data": "id",
                "render": function (data) {
                    return `
                        <div class="w-75 btn-group" role="group">
                        <a href=""
                        class="btn btn-primary mx-2"> <i class="bi bi-pencil-square"></i> </a>
                      
					</div>
                        `
                },
                "width": "5%"
            }
        ]
    });
}

orderConnection.on("newOrder", x => {
    dataTable.ajax.reload();
    toastr.success("New Order Received")
})

async function startConnection() {
    await orderConnection.start()
}

try {
    startConnection();
}
catch (error) {
    console.error("Connection to Chat Hub Unsuccessful")
}
