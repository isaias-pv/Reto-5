import { URL_MESSAGE, URL_CLOUD, URL_CLIENT } from "./api.js";

function postMessage(){
    $.ajax({
        url :  URL_MESSAGE + "save",
        type:   "POST",
        data:   JSON.stringify({
            messageText: $("#messageText").val(),
            cloud: {id: $("#idCloud").val()},
            client: {idClient: $("#idClient").val()}
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
    if(items.length != 0){
        let myTable = document.getElementsByTagName("laodMessages")
        for(let i = 0; i < items.length; i++){
                
            myTable+="<tr>";
            myTable+=`<tr data-id='${items[i].idMessage}'>`;
            myTable+="<td>"+items[i].messageText+"</td>";
            myTable+="<td>"+items[i].cloud.name+"</td>";
            myTable+="<td>"+items[i].client.name+"</td>";
            myTable+='<td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#editModal" id="editMessage">Editar</button><button type="button" class="btn btn-danger" data-toggle="modal" data-target="#exampleModal" id="deleteMessage">Eliminar</button></td>'
            myTable+="</tr>";
        }   
            myTable+="</tbody>";
            $("#loadMessages").empty()
            $("#loadMessages").append(myTable);
    }
}

function putMessage(){
    $.ajax({
        url :  URL_MESSAGE + "update",
        type:   "PUT",
        data: JSON.stringify({
            idMessage: $("#editIdMessage").val(),
            messageText: $("#editMessageText").val()
        }),
        contentType:"application/JSON",
        success:() => {
            alert("Mensaje actualizado")
            getMessage()
        }
    });   
}
function editMessage(id){
    $.ajax({
        url :   URL_MESSAGE + id,
        type:   "GET",
        datatype:   "JSON",
        success:(response) => {
            $("#editIdMessage").val(response.idMessage)
            $("#editMessageText").val(response.messageText)
            $("#editIdCloud").val(response.cloud.name)
            $("#editIdClient").val(response.client.name)
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