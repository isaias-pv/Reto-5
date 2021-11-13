import {URL_CLOUD, URL_CATEGORY} from "./api.js"

function loadOptions(){
    $.ajax({
        url :   URL_CATEGORY + "all",
        type:   "GET",
        datatype:   "JSON",
        success:(response) => {
            response.forEach(element => {
                let option = document.createElement("option")
                option.innerHTML = element.name
                option.value = element.id
                $("#category").append(option)
            });
        }
    });
}

function postCloud(){
    $.ajax({
        url :  URL_CLOUD + "save",
        type:   "POST",
        data:   JSON.stringify({
            brand: $("#brand").val(),
            year: $("#year").val(),
            name: $("#name").val(),
            category: {id: $("#category").val()},
            description: $("#description").val()
        }),
        contentType:"application/JSON",
        datatype: "JSON",
        success:() => {
            alert("Nube guardada")
            getClouds()
        }
    });
}

function getClouds(){
    $.ajax({
        url :   URL_CLOUD + "all",
        type:   "GET",
        datatype:   "JSON",
        success:(response) => {
            loadClouds(response)
        }
    });
}

function loadClouds(items){
    let myTable = document.getElementsByTagName("laodClouds")

    for(let i = 0; i < items.length; i++){

        myTable+="<tr>";
        myTable+=`<tr data-id='${items[i].id}'>`;
        myTable+="<td>"+items[i].brand+"</td>";
        myTable+="<td>"+items[i].year+"</td>";
        myTable+="<td>"+items[i].category.name+"</td>";
        myTable+="<td>"+items[i].name+"</td>";
        myTable+="<td>"+items[i].description+"</td>";
        if(items[i].messages.length == 0 && items[i].reservations.length == 0){
            myTable+="<td><button id='editCloud'>Editar</button><button id='deleteCloud'>Eliminar</button></td>";
        }else{
            myTable+="<td><button id='editCloud'>Editar</button></td>";
        }
        
        myTable+="</tr>";
    }
    myTable+="</tbody>";
    $("#loadClouds").empty()
    $("#loadClouds").append(myTable);
}


function putCloud(){
    $.ajax({
        url :  URL_CLOUD + "update",
        type:   "PUT",
        data: JSON.stringify({
            id: document.getElementById("putCloud").dataset.id,
            brand: $("#brand").val(),
            year: $("#year").val(),
            name: $("#name").val(),
            category: {id: $("#category").val()},
            description: $("#description").val()
        }),
        contentType:"application/JSON",
        success:() => {
            alert("Nube actualizada")
            getClouds()
            document.getElementById("category").disabled = false
            document.getElementById("putCloud").disabled = true
            document.getElementById("postCloud").disabled = false
            $("#brand").val("")
            $("#year").val("")
            $("#name").val("")
            $("#category").val("")
            $("#description").val("")
        }
    });   
}

function deleteCloud(id){
    $.ajax({
        url :   URL_CLOUD + id,
        type:   "DELETE",
        datatype:   "JSON",
        data: JSON.stringify({
            id
        }),
        contentType:"application/JSON",
        success:() => {
            alert("Nube eliminada")
            getClouds()
        }
    });
}

function editCloud(id){
    $.ajax({
        url :   URL_CLOUD + id,
        type:   "GET",
        datatype:   "JSON",
        success:(response) => {
            $("#brand").val(response.brand)
            $("#year").val(response.year)
            $("#name").val(response.name)
            $("#category").val(response.category.id)
            $("#description").val(response.description)
            document.getElementById("category").disabled = true
            document.getElementById("putCloud").disabled = false
            document.getElementById("postCloud").disabled = true
            document.getElementById("putCloud").dataset.id = id
        }
    });
}

$('#postCloud').click(function(){
    postCloud()
});

$('#getClouds').click(function(){
    getClouds()
});

$('#putCloud').click(function(){
    putCloud()
});

document.addEventListener("click", function (e){    
    if(e.target.id == "editCloud"){
        editCloud(e.path[2].dataset.id) 
    }else if(e.target.id == "deleteCloud"){
        deleteCloud(e.path[2].dataset.id) 
    }
})


document.addEventListener("DOMContentLoaded", loadOptions())