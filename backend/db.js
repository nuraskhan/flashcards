const { MongoClient } = require('mongodb');

const URL = 'mongodb://localhost:27017/flashcard';

let dbConnection;

module.exports = {
    connectToDb: (cb) =>{
        MongoClient
            .connect(URL)
            .then((client)=>{
                console.log("Connected to MongoDB");
                dbConnection= client.db();
                return cb();
            })
            .catch((err) =>{
                console.log("Didn't connect to MongoDB");
                return cb(err);
            })
    },
    getDb: () =>dbConnection,
}