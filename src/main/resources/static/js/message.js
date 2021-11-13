import { URL_MESSAGE, URL_CLOUD, URL_CLIENT } from "./api.js";

function postMessage(){
    $.ajax({
        url :  URL_MESSAGE + "save",
        type:   "POST",
        data:   JSON.stringify({
            messageText: $("#messageText").val(),
            cloud: {id: $("#idCloud").val()},
            client: {idClient: 1}
        }),
        contentType:"application/JSON",
        datatype: "JSON",
        success:() => {
            alert("Mensaje guardado")
            getMessage()
        }
    });
}


function loadOptions(){
    $.ajax({
        url :   URL_CLOUD + "all",
        type:   "GET",
        datatype:   "JSON",
        success:(response) => {
            response.forEach(element => {
                let option = document.createElement("option")
                option.innerHTML = element.name
                option.value = element.id
                $("#idCloud").append(option)
            });
        }
    });
    $.ajax({
        url :   URL_CLIENT + "all",
        type:   "GET",
        datatype:   "JSON",
        success:(response) => {
            response.forEach(element => {
                let option = document.createElement("option")
                option.innerHTML = element.name
                option.value = element.idClient
                $("#idClient").append(option)
            });
        }
    });
}

function getMessage(){
    $.ajax({
        url :   URL_MESSAGE + "all",
        type:   "GET",
        datatype:   "JSON",
        success:(response) => {
            loadMessage(response)
        }
    });
}

function loadMessage(items){
    let myTable = document.getElementsByTagName("laodMessages")

    for(let i = 0; i < items.length; i++){

        myTable+="<tr>";
        myTable+=`<tr data-id='${items[i].idMessage}'>`;
        myTable+="<td>"+items[i].messageText+"</td>";
        myTable+="<td>"+items[i].cloud.name+"</td>";
        myTable+="<td>"+items[i].client.name+"</td>";
        myTable+="<td><button id='editMessage'>Editar</button><button id='deleteMessage'>Eliminar</button></td>";
        myTable+="</tr>";

    }
    myTable+="</tbody>";
    $("#loadMessages").empty()
    $("#loadMessages").append(myTable);
}

function putMessage(){
    $.ajax({
        url :  URL_MESSAGE + "update",
        type:   "PUT",
        data: JSON.stringify({
            idMessage: document.getElementById("putMessage").dataset.id,
            messageText: $("#messageText").val()
        }),
        contentType:"application/JSON",
        success:() => {
            alert("Mensaje actualizado")
            getMessage()
            document.getElementById("idCloud").disabled = false
            document.getElementById("idClient").disabled = false
            document.getElementById("putMessage").disabled = true
            document.getElementById("postMessage").disabled = false
            $("#messageText").val("")
            $("#idCloud").val("")
        }
    });   
}
function editMessage(id){
    $.ajax({
        url :   URL_MESSAGE + id,
        type:   "GET",
        datatype:   "JSON",
        success:(response) => {
            $("#messageText").val(response.messageText)
            $("#idCloud").val(response.cloud.id)
            $("#idClient").val(response.client.idClient)
            document.getElementById("idCloud").disabled = true
            document.getElementById("idClient").disabled = true
            document.getElementById("putMessage").disabled = false
            document.getElementById("postMessage").disabled = true
            document.getElementById("putMessage").dataset.id = id
        }
    });
}

function deleteMessage(id){
    $.ajax({
        url :   URL_MESSAGE + id,
        type:   "DELETE",
        datatype:   "JSON",
        data: JSON.stringify({
            id
        }),
        contentType:"application/JSON",
        success:() => {
            alert("Mensaje eliminado")
            getMessage()
        }
    });
}

$('#postMessage').click(function(){
    postMessage()
});

$('#getMessages').click(function(){
    getMessage()
});

$('#putMessage').click(function(){
    putMessage()
});

document.addEventListener("click", function (e){    
    if(e.target.id == "editMessage"){
        editMessage(e.path[2].dataset.id) 
    }else if(e.target.id == "deleteMessage"){
        deleteMessage(e.path[2].dataset.id) 
    }
})

document.addEventListener("DOMContentLoaded", loadOptions())