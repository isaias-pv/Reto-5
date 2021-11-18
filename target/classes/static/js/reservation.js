import { URL_RESERVATION, URL_CLOUD, URL_CLIENT } from "./api.js";

function postReservation(){
    $.ajax({
        url :  URL_RESERVATION + "save",
        type:   "POST",
        data:   JSON.stringify({
            startDate: $("#startDate").val(),
            devolutionDate: $("#finishDate").val(),
            cloud: {id: $("#idCloud").val()},
            client: {idClient: $("#idClient").val()}
        }),
        contentType:"application/JSON",
        datatype: "JSON",
        success:() => {
            alert("Reserva guardada")
            getReservations()
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

function getReservations(){
    $.ajax({
        url :   URL_RESERVATION + "all",
        type:   "GET",
        datatype:   "JSON",
        success:(response) => {
            loadReservation(response)
        }
    });
}

function loadReservation(items){
    for(let i = 0; i < items.length; i++){
        let myTable = document.getElementsByTagName("loadReservations")

        for(let i = 0; i < items.length; i++){

            myTable+="<tr>";
            myTable+=`<tr data-id='${items[i].idReservation}'>`;
            myTable+="<td>"+items[i].idReservation+"</td>";
            myTable+="<td>"+items[i].cloud.name+"</td>";
            myTable+="<td>"+items[i].client.idClient+"</td>";
            myTable+="<td>"+items[i].client.name+"</td>";
            myTable+="<td>"+items[i].client.email+"</td>";
            myTable+= items[i].client.score == null ? "<td>No tiene calificación</td>" : "<td>"+items[i].client.score+"</td>";
            myTable+='<td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#editModal" id="editReservation">Editar</button><button type="button" class="btn btn-danger" data-toggle="modal" data-target="#exampleModal" id="deleteReservation">Eliminar</button></td>'
            myTable+="</tr>";
        }
        myTable+="</tbody>";
        $("#loadReservations").empty()
        $("#loadReservations").append(myTable);
    }
}

function editReservation(id) {
    $.ajax({
        url :   URL_RESERVATION + id,
        type:   "GET",
        datatype:   "JSON",
        success:(response) => {
            $("#editIdReservation").val(response.idReservation)
            $("#editIdCloud").val(response.cloud.name)
            $("#editIdClient").val(response.client.name)
        }
    });
}

function putReservation() {

    if(document.getElementById("editStartDate").value < document.getElementById("editFinishDate").value){
    $.ajax({
        url :  URL_RESERVATION + "update",
        type:   "PUT",
        data: JSON.stringify({
            idReservation: $("#editIdReservation").val(),
            startDate: $("#editStartDate").val(),
            devolutionDate: $("#editFinishDate").val(),
            status: $("#editStatus").val()
        }),
        contentType:"application/JSON",
        success:() => {
            alert("Reserva actualizada")
            getReservations()
        }
    });       
    }else{
        alert("La fecha de inicio en menor a la de devolución. Cambiela")
    }
    
}

function deleteReservation(id){
    $.ajax({
        url :   URL_RESERVATION + id,
        type:   "DELETE",
        datatype:   "JSON",
        data: JSON.stringify({
            id
        }),
        contentType:"application/JSON",
        success:() => {
            alert("Reserva eliminada")
            getReservations()
        }
    });
}

$('#postReservation').click(function(){
    postReservation()
});

$('#getReservations').click(function(){
    getReservations()
});

$('#putReservation').click(function(){
    putReservation()
});

document.addEventListener("click", function (e){    
    if(e.target.id == "editReservation"){
        editReservation(e.path[2].dataset.id) 
    }else if(e.target.id == "deleteReservation"){
        deleteReservation(e.path[2].dataset.id) 
    }
})

document.addEventListener("DOMContentLoaded", loadOptions())

