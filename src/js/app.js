'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config');
var MongoDbService = require("./persistence/MongoDbService");
var ApiService = require("./persistence/ApiService");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', require('./routes/apiRoutes'));



//do all initialization here before starting service
async function init() {
    await MongoDbService.init(config);
    ApiService.setDb(MongoDbService.getDb());
}

var server;


init().then(() => {
    server = app.listen(3000, function () {
        console.log("Server listening on 3000");
    });
}).catch((err) => {
    console.log("Failed to start server " + err.stack);
});
