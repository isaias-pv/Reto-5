import {URL_CLIENT} from "./api.js"

function postClient(){
    $.ajax({
        url :  URL_CLIENT + "save",
        type:   "POST",
        data:   JSON.stringify({
            name: $("#name").val(),
            email: $("#email").val(),
            age: $("#age").val(),
            password: $("#password").val(),
        }),
        contentType:"application/JSON",
        datatype: "JSON",
        success:() => {
            alert("Cliente guardado")
            getClients()
        }
    });
}

function getClients(){
    $.ajax({
        url :   URL_CLIENT + "all",
        type:   "GET",
        datatype:   "JSON",
        success:(response) => {
            loadClients(response)
        }
    });
}

function loadClients(items){
    let myTable = document.getElementsByTagName("laodClients")

    for(let i = 0; i < items.length; i++){

        myTable+=`<tr data-id='${items[i].idClient}'>`;
        myTable+="<td>"+items[i].name+"</td>";
        myTable+="<td>"+items[i].email+"</td>";
        myTable+="<td>"+items[i].age+"</td>"; 
        myTable+="<td><button id='editClient'>Editar</button></td>";
        myTable+="</tr>";
    }
    myTable+="</tbody>";
    $("#loadClients").empty()
    $("#loadClients").append(myTable);
}

function putClient(){
    $.ajax({
        url :  URL_CLIENT + "update",
        type:   "PUT",
        data:   JSON.stringify({
            idClient: document.getElementById("putClient").dataset.id, 
            name: $("#name").val(),
            email: $("#email").val(),
            age: $("#age").val(),
            password: $("#password").val(),
        }),
        contentType:"application/JSON",
        success:() => {
            alert("Cliente actualizado")
            getClients()
            document.getElementById("putClient").disabled = true
            document.getElementById("postClient").disabled = false
            document.getElementById("email").disabled = false
            $("#name").val("")
            $("#email").val("")
            $("#age").val("")
            $("#password").val("")
        }
    });   
}

function deleteClient(id) {
    $.ajax({
        url :   URL_CLIENT + id,
        type:   "DELETE",
        datatype:   "JSON",
        data: JSON.stringify({
            id
        }),
        contentType:"application/JSON",
        success:() => {
            alert("Cliente eliminado")
            getClients()
        }
    });
}


function editClient(id){
    $.ajax({
        url :   URL_CLIENT + id,
        type:   "GET",
        datatype:   "JSON",
        success:(response) => {
            $("#name").val(response.name)
            $("#email").val(response.email)
            $("#age").val(response.age)
            $("#password").val(response.password)
            document.getElementById("email").disabled = true
            document.getElementById("postClient").disabled = true
            document.getElementById("putClient").disabled = false
            document.getElementById("putClient").dataset.id = id
        }
    });
}


$('#postClient').click(function(){
    postClient()
});

$('#getClients').click(function(){
    getClients()
});

$('#putClient').click(function(){
    putClient()
});

document.addEventListener("click", function (e){    
    if(e.target.id == "editClient"){
        editClient(e.path[2].dataset.id) 
    }else if(e.target.id == "deleteClient"){
        deleteClient(e.path[2].dataset.id) 
    }
})