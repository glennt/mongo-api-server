const MongoClient = require('mongodb').MongoClient;
const _ = require("lodash");

class MongoDbService {

    constructor() {
        this.db = null;
    }

    async init(config) {

        let self = this;
        self.config = config;
        return new Promise((resolve, reject) => {
            MongoClient.connect(config.url, function (err, client) {
                if(err) {
                    reject(err);
                } else {
                    console.log("Connected successfully to server");
                    self.client = client;
                    resolve();
                }
            });
        });
    }

    getDb(dbName) {
        if(_.isUndefined(dbName)) dbName = this.config.dbName;
        return this.client.db(dbName);
    }
}

module.exports = new MongoDbService();