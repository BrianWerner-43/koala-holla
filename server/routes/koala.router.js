const express = require('express');
const koalaRouter = express.Router();
const pool = require('../modules/pool.js');
// DB CONNECTION


// GET
koalaRouter.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "koalas" ORDER BY "id";'
    pool.query(queryText)
    .then((dbresult) => {
        console.log('dbresult.rows:', dbresult.rows)
        res.send(dbresult.rows)
    })
    .catch(dbError => {
        console.log("error getting koalas",dbError)
        res.sendStatus(500)
    })
});

// POST
//posting a new koala
koalaRouter.post('/', (req, res) => {
    console.log('In post route', req.body);
    let queryText = `
    INSERT INTO "koalas"
     ("name", "gender", "age", "readyToTransfer", "notes")
    VALUES
    ($1, $2, $3, $4, $5);

    `
    
    

    const sqlValues = [
        req.body.koalaName,
        req.body.koalaGender,
        req.body.koalaAge,
        req.body.koalaTransferStatus,
        req.body.koalaNotes
    ]

    pool.query(queryText, sqlValues)
    .then((dbResult) => {
        res.sendStatus(201)
    })
    .catch((dbError) => {
        console.log('POST /koalas query faild', dbError)
    })
});


// PUT
koalaRouter.put('/:id',(req, res) => {
    //             👆🏻
    // this sets the id as the first value 

    let idOfKoalas = req.params.id;
    // req.body vs req.params.property
    // we use req.body when data is static, but when data is dynamic, we use
    // req.params.property



    const sqlText = `
    UPDATE "koalas"
     SET "readyToTransfer" = NOT "readyToTransfer"
     WHERE "id" = ($1);
      `
    const sqlValues = [idOfKoalas];

    pool.query(sqlText,sqlValues)
    .then((dbResult) =>{
        res.sendStatus(200);
    })
    .catch((dbError)=>{
        console.log('PUT /koalas:id failed', dbError)
        res.sendStatus(500);
    })
});


// DELETE
koalaRouter.delete('/:id',(req,res)=>{
    let idOfKoalaToDelete = req.params.id;
    const sqlText =
    `
    DELETE FROM "koalas"
    WHERE "id" = ($1)

    ` 
    const sqlValues = [idOfKoalaToDelete];
    pool.query(sqlText,sqlValues)
    .then((dbResult) =>{
        res.sendStatus(200);
    })
    .catch((dbError)=> {
        console.log("DELETE /koalas/:id failed:", dbError);
        res.sendStatus(500);
    })
});

module.exports = koalaRouter;