//set up exports
//const { REFUSED } = require('dns');
const express = require('express');
const listRouter = express.Router();
const pool = require('../modules/pool');

//Get:server is giving the data client requested
//but first serer needs to connect to database with pool
listRouter.get('/',(req,res) => {
    let sqlText = 'SELECT * FROM "list";';
    pool.query(sqlText)
    .then(result => {
        //sending the table rows(content) to client
        console.log('result row is',result.rows)
        res.send(result.rows);
    }).catch(error =>{
        console.log('we have error in server get', error);
        res.send(500)
    })

})

//Post server is connecting to database
//sanitizing the values and storing them in database?
listRouter.post('/',(req,res) =>{
    const newList = req.body
    
    console.log('new list is', newList)
    let sqlText = `INSERT INTO "list"("task", "complete")
                    VALUES($1, $2);`;
    const values = [newList.task,newList.complete]
    pool.query(sqlText, values)
    .then(result => {
        res.sendStatus(201); //working
    })
    .catch(error =>{
        console.log('error in server post', error);
        res.sendStatus(500); //not working
    })
})
//PUT 
listRouter.put('/:id', (req,res) => {
    console.log('in server put');
    let idToUpdate = req.params.id
    let complete = req.body.complete
    let sqlText = `UPDATE "list" SET "complete" = 'yes'
                    WHERE "id" = $1;`;
    if (complete === 'no') {
        return sqlText
    }
    pool.query(sqlText, [idToUpdate])
    .then(result => {
        console.log('complete is updated', result.rows);
        res.send(200);
    })
    .catch((error) =>{
        console.log('failed updating list', error)
        res.send(500);

    })
})
//Delete
listRouter.delete('/:id',(req,res) =>{
    console.log('in server delete');
    let idToDelete = req.params.id;
    let sqlText= `DELETE FROM "list" WHERE "id" = $1;`;
    pool.query(sqlText, [idToDelete])
    .then((result) => {
        console.log('task been deleted', result.rows);
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log('error with Delete', error);
        res.sendStatus(500);
    })
})
module.exports = listRouter;
