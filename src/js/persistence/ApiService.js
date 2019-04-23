const mongodb = require('mongodb');

class ApiService {

    constructor() {
        this.collection = "records";
    }

    setDb(db) {
        this.db = db;
    }

    getCollection() {
        return this.db.collection(this.collection);
    }

    async addRecord(record) {
        let collection = this.getCollection();

        return new Promise((resolve, reject) => {
            collection.insert(record, (err, result) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    async findRecordById(id) {
        let collection = this.getCollection();
        return new Promise((resolve, reject) => {
            collection.find({"_id": new mongodb.ObjectID(id)}).toArray((err, result) => {
                if(err) {
                    reject(err);
                } else {
                    console.log(result);
                    resolve(result);
                }
            });
        });
    }

}



module.exports = new ApiService();

