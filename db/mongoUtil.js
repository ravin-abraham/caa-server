var MongoClient = require( 'mongodb' ).MongoClient;
var url = "mongodb://localhost:27017/mydb";
var _db;

module.exports = {

  connectToDatabase: function(callback) {
    MongoClient.connect( url, function( err, db ) {
      _db = db;
      console.log("Database connect request response : ",db);
      return callback( err );
    });
  },

  getDb: function() {
    return _db;
  }
};

