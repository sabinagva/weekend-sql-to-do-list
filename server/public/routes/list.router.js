//set up exports
const { REFUSED } = require('dns');
const express = require('express');
const listRouter = express.Router();
const pool = require('../modules/pool');

//Get:server is giving the data client requested
//but first serer needs to connect to database with pool
listRouter.get('/',(req,res) => {
    let SqlText = 'SELECT * FROM "list";';
    pool.query(SqlText)
    .then(result => {
        //sending the table rows(content) to client
        console.log('result row is',result.rows)
        res.send(result.rows);
    }).catch(error =>{
        console.log('we have error in server get', error);
        res.send(500)
    })

})

//Post
//PUT 
//Delete