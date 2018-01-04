var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/example'
MongoClient.connect(url)
  .then(function (db) { // <- db as first argument
    console.log(db);
    return db.close();
  })
  .catch(function (err) {})
