var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function(err, db) {

    //Insert row/record.
    var myobj = { name: "Company Inc", address:[], empty_obj : {} };
    db.collection("customers1").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("Number of documents inserted: " + res.insertedCount);
    
      //Find record.
      db.collection("customers1").find({}).toArray(function(err, result) {
          if (err) throw err;
          console.log(result);
     
        //Drop Collection (table)
        db.collection("customers1").drop(function(err, delOK) {
           if (err) throw err;
           if (delOK) console.log("Collection deleted");
           db.close();
        });

      });
    
    });
    
  });  


