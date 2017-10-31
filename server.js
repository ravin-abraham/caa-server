var express = require('express');
var bodyParser = require('body-parser');

// Create server
var server = express();
server.use(bodyParser.json());


// Serve static files
server.use(express.static('dist'));

//Set up
server.use('/api', require('./routes/api'));

// Initialized Database Connection Pool
var mongoUtil = require('./db/mongoUtil');
mongoUtil.connectToDatabase( function(err) {
    if (err) {
    console.error('Failed to make database connections!');
    console.error(err);
    process.exit(1);
    }

    // Start listening
    var PORT = 3001;
    server.listen(PORT, function() {
    console.log('listening at %s', PORT);
  });
});

//Create Data and Insert
//Read/Render Data in FE


