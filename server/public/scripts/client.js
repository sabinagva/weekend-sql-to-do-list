//event listeners
$(document).ready(function(){
    console.log('jq');
 $('#addBtn').on('click', addTask);
 getList();
$('#viewList').on('click', '.delete-btn', deleteTask); // we are calling tbody since btn is on it
$('#viewList').on('click', '.complete-btn', updateList);
})



//get function (get)
//client needs this data so it can render to dom 
//(thats why we call RTD in this function)
function getList(){
    console.log('in getList function')
    $.ajax({
        method: 'GET',
        url: '/list' 
    }).then(function(response){
        console.log('get list response is(list)', response);
        renderToDom()
    }).catch(function(error){
        console.log('error with getting list items', error);
    });
}
//render to dom
function renderToDom(response){
    $('#viewList').empty();
    for (list of response) {
        $('#viewList').append(`
        <tr data-id="${list.id}">
        <td>${list.task}</td>
        <td>${list.complete}</td>
        <td><button id="complete-btn">Complete</button></td>
        <td><button id="delete-btn">DELETE</button></td>
      </tr>
        `)
    }
};
// add function (post)
// client is posting new data for server to store it

addList() {
    console.log('in add list(post function');
 let data = {
    task: $('#taskIn').val()
 }

 $.ajax({
    method: 'POST',
    url: '/list',
    data: data
 }).then(function(response){
    console.log('response is',response)
    $('#taskIn').val('')

 }).catch(function(error){
    console.log('error with client post', error);
 });
}




//update the list (put)
//delete function (delete)
