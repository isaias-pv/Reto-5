import { URL_RESERVATION } from "./api.js";

function getReportStatus(){
    $.ajax({
        url :   URL_RESERVATION + "report-status",
        type:   "GET",
        datatype:   "JSON",
        success:(response) => {
            if (response.completed != undefined && response.cancelled != undefined && response.completed != 0 || response.cancelled != 0){
                $("#number-reservations").text(response.completed + response.cancelled)
                loadTableReportStatus(response)
            }else{
                $("#number-reservations").text(0)
                $("#btn-reservations").prop('disabled', true);
            }
        }
    });
}

function getReportClients(){
    $.ajax({
        url :   URL_RESERVATION + "report-clients",
        type:   "GET",
        datatype:   "JSON",
        success:(response) => {
            if (response[0].total != undefined && response[0].total != 0){
                $("#number-top-clients").text(response[0].total)
                loadTableReportTopClient(response)
            }else{
                $("#number-top-clients").text(0)
                $("#btn-top-clients").prop('disabled', true);
            }
        }
    });
}

function getReportDateAB(a , b){
    if(a < b){
        $.ajax({
            url :   URL_RESERVATION + "report-dates/" + a + "/" + b, 
            type:   "GET",
            datatype:   "JSON",
            success:(response) => {
                loadTableReportDateRange(response)
            }
        });
    }else{
        alert("La fecha de inicio es menor a la de devolución. ¡Cambiela!")
    }    
}

function loadTableReportDateRange(data){
    let myTable = document.getElementById("table-two-body")
    if(data.length == 0){
        $("#number-two").text("Cantidad: " + 0)
        myTable += `<tr>
        <td colspan="4">Tabla vacia<td>
        </tr>`
    }else{
        $("#number-two").text("Cantidad: " + data.length)
        data.forEach(element => {
            myTable += "<tr>"
            myTable += `<td>${element.idReservation}</td>`
            myTable += `<td>${element.startDate}</td>`
            myTable += `<td>${element.devolutionDate}</td>`
            myTable += `<td>${element.status}</td>`
            myTable += "</tr>"
        });
    }
    $("#table-three-body").append(myTable);
}

function loadTableReportStatus(data){
    $("#table-one-body").empty()
    let myTable = document.getElementById("table-one-body")
    myTable += `
        <tr>
            <th scope="row">#</th>
            <td>${data.completed}</td>
            <td>${data.cancelled}</td>
        </tr>`
    $("#table-one-body").append(myTable);
}

function loadTableReportTopClient(data){
    let myTable = document.getElementById("table-two-body")
    if(data[0].total == 0 || undefined){
        $("#number").text("Cantidad: " + 0)
        myTable += `<tr>
        <td colspan="6">Tabla vacia<td>
        </tr>`
    }else{
        $("#number").text("Cantidad: " + data[0].total)
        data.forEach(element => {
            myTable += "<tr>"
            myTable += `<td>${element.client.idClient}</td>`
            myTable += `<td>${element.client.email}</td>`
            myTable += `<td>${element.client.name}</td>`
            myTable += `<td>${element.client.age}</td>`
            myTable+="<td><ul>"  
            element.client.reservations.forEach(elementR => {
                myTable += `<li>${elementR.idReservation} / ${elementR.startDate} / ${elementR.devolutionDate} / ${elementR.status}</li>`;
            });
            // myTable+="</ul></td>";
            myTable += `<td>${element.client.messages.length}</td>`
            myTable += "</tr>"
        });
        
    }
    $("#table-two-body").append(myTable);
}

$(document).ready(function(){
    getReportClients()
    getReportStatus()
});

$("#btn-report-date-AB").click(function(){
    getReportDateAB(document.getElementById("startDate").value, document.getElementById("finishDate").value)
})
