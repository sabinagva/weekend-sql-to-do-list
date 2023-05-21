//event listeners
$(document).ready(function(){
    console.log('jq');
    getList();
 $('#addBtn').on('click', addTask);
$('#viewList').on('click', '.delete-btn', deleteTask); // we are calling tbody since btn is on it
$('#viewList').on('click', '.complete-btn', updateComplete);
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
        renderToDom(response) //has to have response in it
    }).catch(function(error){
        console.log('error with getting list items', error);
    });
}
//render to dom
function renderToDom(response){
    $('#viewList').empty();
    for (let list of response) {
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
// client is posting new data entered by users
//to server so it can store it

function addTask(){
    console.log('in add list(post function');
 let taskToSend = {
    task: $('#taskIn').val(),
    complete: false //false is a hardcode
 };

 $.ajax({
    method: 'POST',
    url: '/list',
    data: taskToSend
 }).then(function(response){
    console.log('response is',response)
    $('#taskIn').val('')  //clear input
    location.reload() //this makes it reload right away

 }).catch(function(error){
    console.log('error with client post', error);
 });
}

//update the list (put)
function updateComplete(){
    console.log('in updateTask function');
    idToUpdate= $(this).closest('tr').data('id');
    let data = {

    }
    $.ajax({
        method: 'PUT',
        url: `/list/${idToUpdate}`
    }).then(function(response){
        console.log('update list works', response);
        getList();
    
      }).catch(error=>{
        console.log('update list is not functioning',error);
      })

}

//delete function (delete)
function deleteTask(){
    console.log('in deleteTask function');
    const idToDelete = $(this).closest('tr').data('id');
    $.ajax({
        method: 'DELETE',
        url: `/list/${idToDelete}`
    }).then (function(response){
        console.log('deleting list item is working');
        getList(); //refreshes the page
    }).catch(error =>{
        console.log('error with client delete function');
    })
}
//module.exports = listRouter;
