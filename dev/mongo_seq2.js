var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";



MongoClient.connect(url, function(err, db) {
  //Create Collection (Table)
  db.createCollection("customers1", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");

    //Insert row/record.
    var primary_object = { last_updated_ts: new Date().toISOString() , pairing_devices:["fusion","nexus"], empty_obj : {} };

    db.collection("customers1").insertOne(primary_object, function(err, res) {
      if (err) throw err;
      console.log("Number of primary documents inserted: " + res.insertedCount);
    
      //Find record.
      db.collection("customers1").find({}).toArray(function(err, result) {
          if (err) throw err;
          
          
          console.log("primary record", result);
          //Compose secondary object
          f_key = result[0]._id;
          rdd_obj = {a:1, b:2}
          rdc_obj = {a:1.1, b:2.2}
          var secondary_object = { _id : {c_id: f_key, ts : new Date().toISOString()}, pm:[], rdd: rdd_obj, rdc: rdc_obj};

          //create collection/table for secondary records.
          db.createCollection("cust_records", function(err, res) {
            if (err) throw err;

            //insert secondary row/record.
            db.collection("cust_records").insertOne(secondary_object, function(err, result) {
                 if (err) throw err;
                 console.log("Number of secondary documents inserted: ", result.insertedCount);

                //Find secondary record.
                db.collection("cust_records").find({}).toArray(function(err, result) {
                    if (err) throw err;
                    console.log("secondary record", result);

                    //Drop Secondary Collection (table)
                    db.collection("cust_records").drop(function(err, delOK) {
                        if (err) throw err;
                        if (delOK) console.log("Secondary collection deleted");
                    
                        //Drop Primary Collection (Table)
                        db.collection("customers1").drop(function(err, delOK) {
                          if (err) throw err;
                          if (delOK) console.log("Primary collection deleted");
                          db.close();
                        });
                    });
                });
              });
          });             
      });    
    });    
  });
});