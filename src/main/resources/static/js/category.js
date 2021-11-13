import {URL_CATEGORY} from "./api.js"

function postCategory(){
    $.ajax({
        url :  URL_CATEGORY + "save",
        type:   "POST",
        data:   JSON.stringify({
            name: $("#name").val(),
            description: $("#description").val()
        }),
        contentType:"application/JSON",
        datatype: "JSON",
        success:() => {
            alert("Categoria guardada")
            getCategory()
            $("#name").val("")
            $("#description").val("")            
        }
    });
}

function getCategory(){
    $.ajax({
        url :   URL_CATEGORY + "all",
        type:   "GET",
        datatype:   "JSON",
        success:(response) => {
            loadCategories(response)
        }
    });
}

function loadCategories(items){
    let myTable = document.getElementsByTagName("laodCategory")
    
    for(let i = 0; i < items.length; i++){
        myTable+=`<tr data-id='${items[i].id}'>`;
        myTable+="<td>"+items[i].name+"</td>";
        myTable+="<td>"+items[i].description+"</td>";
        myTable+="<td><ul>"  
        items[i].clouds.forEach(element => {
            myTable += `<li>${element.brand} -- ${element.year} -- ${element.name} -- ${element.description}</li>`;
        });
        myTable+="</ul></td>";

        if(items[i].clouds.length == 0){
            myTable+="<td><button id='editCategory'>Editar</button><button id='deleteCategory'>Eliminar</button></td>";
        }else{
            myTable+="<td><button id='editCategory'>Editar</button></td>";
        }
        myTable+="</tr>";

    }
    myTable+="</tbody>";
    $("#loadCategories").empty()
    $("#loadCategories").append(myTable);
}

function putCategory(){
    $.ajax({
        url :  URL_CATEGORY + "update",
        type:   "PUT",
        data: JSON.stringify({
            id: document.getElementById("putCategory").dataset.id,
            name: $("#name").val(),
            description: $("#description").val()
        }),
        contentType:"application/JSON",
        success:() => {
            alert("Categoria actualizada")
            getCategory()
            document.getElementById("putCategory").disabled = true
            document.getElementById("postCategory").disabled = false
            $("#name").val("")
            $("#description").val("")
        }
    });   
}

function deleteCategory(id) {
    $.ajax({
        url :   URL_CATEGORY + id,
        type:   "DELETE",
        datatype:   "JSON",
        data: JSON.stringify({
            id
        }),
        contentType:"application/JSON",
        success:() => {
            alert("Categoria eliminada")
            getCategory()
        }
    });
}

function editCategory(id){
    $.ajax({
        url :   URL_CATEGORY + id,
        type:   "GET",
        datatype:   "JSON",
        success:(response) => {
            $("#description").val(response.description)
            $("#name").val(response.name)
            document.getElementById("putCategory").disabled = false
            document.getElementById("postCategory").disabled = true
            document.getElementById("putCategory").dataset.id = id
        }
    });
}

$('#postCategory').click(function(){
    postCategory()
});

$('#getCategories').click(function(){
    getCategory()
});

$('#putCategory').click(function(){
    putCategory()
});

document.addEventListener("click", function (e){    
    if(e.target.id == "editCategory"){
        editCategory(e.path[2].dataset.id) 
    }else if(e.target.id == "deleteCategory"){
        deleteCategory(e.path[2].dataset.id) 
    }
})