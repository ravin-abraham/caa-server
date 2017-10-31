var mongoUtil = require( './db/mongoUtil' );

/* Utility Function */  
  function reflect(promise){
    return promise.then(function(v){ return {v:v, status: "resolved" }},
                        function(e){ return {e:e, status: "rejected" }});
  }


/* New Pair Session Related */

// 1. Create a New Pair Session
function createPairSession(item) {
    var primary_object = { last_updated_ts: new Date().toISOString() , pairing_devices:["fusion","nexus"], val_from_req: item.name };
    console.log("Inserting into customers1, object : ", primary_object);
    return mongoUtil.getDb().collection("customers1").insertOne(primary_object)
    .then(function (result) {
      return mongoUtil.getDb().collection("customers1").find(result.insertedId).toArray()
    });
};

// 2. Get Pair Session By Primary Key
function getPairSessionById() {
    console.log("Todo. not implemented!");        
    return Promise.resolve("Not Implemented!");
};


// 3. Get Latest Pair Session ID
function getLatestPairSession() {
    console.log("Fetching latest pair session from the database.");        
    return mongoUtil.getDb().collection("customers1").find().sort({"last_updated_ts": -1}).limit(1).toArray()
};


/* Session Data Related */

// Not implemented!

/* Development Hooks */


//Drop Collections
function dropCollections() {
  var tablename = ["customers1", "cust_records"];
  var actions = tablename.map(function (val) {
    return mongoUtil.getDb().collection(val).drop()
  });
  
  var dropresults = Promise.all(actions.map(reflect));
  
  return dropresults.then(function(results){
    return Promise.resolve(
      results.map(function(val) { return val.status })
      )
  });
};


module.exports = {
  createPairSession: createPairSession,
  dropCollections: dropCollections,
  getPairSessionById: getPairSessionById,
  getLatestPairSession: getLatestPairSession 
}
