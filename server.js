var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');

// Create server
var server = express();
server.use(bodyParser.json());
//server.use(bodyParser.urlencoded({ extended: false }));
server.use(cookieParser());


// Serve static files
server.use(express.static('dist'));


server.use('/api', require('./routes/api'));

server.route('/*').get(function(req, res) { 
    return res.sendFile(path.join(__dirname, 'dist/index.html')); 
});

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
