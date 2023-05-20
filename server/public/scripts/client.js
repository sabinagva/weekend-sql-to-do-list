//event listeners
$('#addBtn').on('click', addTask);
$('#viewList').on('click', '#delete-btn', deleteTask); // we are calling tbody since btn is on it
//$('#viewList').on('click', '#complete-btn', updateList);


//get function (get)
//client needs this data so it can render to dom 
//(thats why we call RTD in this function)
function getList(){
    console.log('in getList function')
    $.ajax({
        method: 'GET',
        url: '/list'
    }).then(function(response){
        console.log('get list response is', response);
        renderToDom()
    }).catch(function(error){
        console.log('error with getting list items', error);
    });
}
// add function (post)
//render to dom
//update the list (put)
//delete function (delete)
