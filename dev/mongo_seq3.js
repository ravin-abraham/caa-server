var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/example'
let database = null;
let secondary_object = null;
MongoClient.connect(url)
  .then(function (db) { 
  database = db;	
  return database.createCollection("customers1")
  })
  .then(function () {
  	var primary_object = { last_updated_ts: new Date().toISOString() , pairing_devices:["fusion","nexus"], empty_obj : {} };
  	return database.collection("customers1").insertOne(primary_object)
  })
  .then(function () {
  	return database.collection("customers1").find({}).toArray() 
  })
  .then(function (result) {
  	console.log("primary record", result);
  	//Compose secondary object
     f_key = result[0]._id;
     rdd_obj = {a:1, b:2}
     rdc_obj = {a:1.1, b:2.2}
     secondary_object = { _id : {c_id: f_key, ts : new Date().toISOString()}, pm:[], rdd: rdd_obj, rdc: rdc_obj};     
  })
  .then(function () {
  	return database.collection("cust_records").insertOne(secondary_object);
  })
  .then(function () {
  	return database.collection("cust_records").find({}).toArray()
  })
  .then(function (result) {
  	console.log("secondary record", result);
  	return database.collection("cust_records").drop()	
  })
  .then(function () {
  return database.collection("customers1").drop()
  }).then(function (){
  	console.log("Resolve POC");  	  	
  	return Promise.resolve("123");
  })
  .then(function (status){
  console.log("Status", status);
  database.close();
  })
  .catch(function (err) {
  	console.log(err)
  });

  


 