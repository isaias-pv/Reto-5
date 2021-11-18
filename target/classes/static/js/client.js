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
    if(items.length != 0){
        let myTable = document.getElementsByTagName("laodClients")
        for(let i = 0; i < items.length; i++){    
            myTable+=`<tr data-id='${items[i].idClient}'>`;
            myTable+="<td>"+items[i].name+"</td>";
            myTable+="<td>"+items[i].email+"</td>";
            myTable+="<td>"+items[i].age+"</td>"; 
            myTable+='<td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#editModal" id="editClient">Editar</button></td>';
            myTable+="</tr>";
            }
        myTable+="</tbody>";
        $("#loadClients").empty()
        $("#loadClients").append(myTable);
    }
}

function putClient(){
    $.ajax({
        url :  URL_CLIENT + "update",
        type:   "PUT",
        data:   JSON.stringify({
            idClient: $("#editIdClient").val(), 
            name: $("#editName").val(),
            email: $("#editEmail").val(),
            age: $("#editAge").val(),
            password: $("#editPassword").val(),
        }),
        contentType:"application/JSON",
        success:() => {
            alert("Cliente actualizado")
            getClients()            
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
            $("#editIdClient").val(response.idClient)
            $("#editName").val(response.name)
            $("#editEmail").val(response.email)
            $("#editAge").val(response.age)
            $("#editPassword").val(response.password)
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