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
    if(items.length != 0){
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
                myTable+='<td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#editModal" id="editCategory">Editar</button><button type="button" class="btn btn-danger" data-toggle="modal" data-target="#exampleModal" id="deleteCategory">Eliminar</button></td>'
            }else{
                myTable+='<td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#editModal" id="editCategory">Editar</button></td>';
            }
            myTable+="</tr>";
    
        }
        myTable+="</tbody>";
        $("#loadCategories").empty()
        $("#loadCategories").append(myTable);
    }
}

function putCategory(){
    $.ajax({
        url :  URL_CATEGORY + "update",
        type:   "PUT",
        data: JSON.stringify({
            id: $("#editId").val(),
            name: $("#editName").val(),
            description: $("#editDescription").val()
        }),
        contentType:"application/JSON",
        success:() => {
            alert("Categoria actualizada")
            getCategory()
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
            getCategory()
            alert("Categoria eliminada")
        }
    });
}

function editCategory(id){
    $.ajax({
        url :   URL_CATEGORY + id,
        type:   "GET",
        datatype:   "JSON",
        success:(response) => {
            $("#editDescription").val(response.description)
            $("#editName").val(response.name)
            $("#editId").val(response.id)
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