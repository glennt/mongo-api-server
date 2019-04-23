var express = require('express');
var router = express.Router();
var ApiService = require("../persistence/ApiService");

router.post('/records', async function(req, res, next) {

    let body = req.body;

    ApiService.addRecord(body).then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
        res.status(500);
        res.send({message: err.message});
    })

});

router.get('/records/:recordId', async function(req, res, next) {

    ApiService.findRecordById(req.params.recordId).then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
        res.status(500);
        res.send({message: err.message});
    })

});

module.exports = router;
