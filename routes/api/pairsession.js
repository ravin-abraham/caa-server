var router = require('express').Router();
var database = require('../../database');


router.post('/', function(req, res, next) {  
  database.createPairSession(req.body)
  .then(function(result){
   var insertedId = result.insertedId; 
   console.log("Inserted document with primary key id : ",insertedId);
   console.log("Inserted result : ",result);
   res.send( result );
   next();
  })
  .catch(function (err) {
    console.log(err);
    res.statusCode = 500;
    res.send({errors: ['Error creating PairSession1']});
    next();
  });
});

router.get('/:id', function(req, res, next) {
  if (req.params.id == "latest")
  {
  	database.getLatestPairSession()
  	.then(function(result){
    	console.log("Details for most recent pair session");
    	res.send(result);
    	next();    
  	})
  	.catch(function (err) {
    	console.log(err);
    	res.statusCode = 500;
    	res.send({errors: ['Error retrieving Recent PairSession Details.']});
    	next();
  	});

  }  	
  else
  {
  	database.getPairSessionById(req.params.id)
  	.then(function(result){
    	console.log("Details for document with Id : ", req.params.id);
    	res.send(result);
    	next();
  	})
  	.catch(function (err) {
    	console.log(err);
    	res.statusCode = 500;
    	res.send({errors: ['Error retrieving PairSession Details for provided Id.']});
    	next();
  	})
  }
});


module.exports = router;



