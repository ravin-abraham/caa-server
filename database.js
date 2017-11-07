var mongoUtil = require( './db/mongoUtil' );
var mongo = require('mongodb');
/* Utility Function */  
  function reflect(promise){
    return promise.then(function(v){ return {v:v, status: "resolved" }},
                        function(e){ return {e:e, status: "rejected" }});
  }


/* Pair Session and Session Data Related */

// 1. Create a New Pair Session
function createPairSession(item) {
    var primary_object = { last_updated_ts: new Date().getTime() , pairing_device_ids: item.pairing_device_ids, pair_match_value: [], raw_data_device : [], raw_data_vehicle : [] };
    console.log("Inserting into pairingsession, object : ", primary_object);
    return mongoUtil.getDb().collection("pairingsession").insertOne(primary_object)
    .then(function (result) {
      return mongoUtil.getDb().collection("pairingsession").find(result.insertedId).toArray()
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
    return mongoUtil.getDb().collection("pairingsession").find({}).sort({"last_updated_ts": -1}).limit(1).toArray()
};


// 4. Update/Patch Pair Session Data
function updateSessionData(patch_request_array, id) {
  var pair_match;
  var raw_data_vehicle;
  var raw_data_device;
  var patch_set = {};
  var current_ts = new Date().getTime();
  
  patch_set.$set = {};
  patch_set.$push = {};
  patch_set.$set.last_updated_ts = current_ts;

  patch_request_array.forEach(function(elem){
      var op = elem.op;
      var path = elem.path;

      if (path === "/pair_match_value/-") { 
        pair_match_value = {};
        pair_match_value[current_ts] = elem.value;           
        patch_set.$push.pair_match_value = pair_match_value;
      }

      if (path === "/raw_data_device/-") {      
        patch_set.$push.raw_data_device.current_ts = elem.value;      
      }

      if (path === "/raw_data_vehicle/-") {
        patch_set.$push.raw_data_vehicle.current_ts = elem.value;      
      }     
    });
    console.log(patch_set, id);
    return mongoUtil.getDb().collection("pairingsession").findOneAndUpdate({"_id" : new mongo.ObjectID(id) }, patch_set);
};



/* Development Hooks */

//Drop Collections
function dropCollections() {
  var tablename = ["customers1", "cust_records", "pairingsession"];
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
  getLatestPairSession: getLatestPairSession,
  updateSessionData: updateSessionData
}
