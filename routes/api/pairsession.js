var router = require('express').Router();
var database = require('../../database');

/* Create a new Pair Session */
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
    return errorResponse(err, 500, "Error creating PairSession.", res, next);
  });
});

/* Retrieve details for pair session referenced by Id or last updated pair session */
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
    	return errorResponse(err, 500, "Error retrieving Recent PairSession Details.", res, next);
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
    	return errorResponse(err, 500, "Error retrieving PairSession Details for provided Id.", res, next);
  	})
  }
});


/* Handle a Patch Request to update pair match value and optional vehicle data and device data */
router.patch('/:id', function (req, res, next) {
	
	var patch_request_array = JSON.parse(JSON.stringify(req.body));	
	if (!validatePatchRequest(patch_request_array)){
		return errorResponse(null, 500, "Schema Validation Failed for Patch Request.", res, next);
	}

  	database.updateSessionData(patch_request_array,req.params.id)
  	.then(function(result){
    	console.log("Update details for document with Id : ", req.params.id, result);
    	res.send(result);
    	next();
  	})
  	.catch(function (err) {
		return errorResponse(err, 500, "Error handling Patch Request in database.", res, next);
  	})  
});

/* Customizable Error Response */
function errorResponse(err, code, msg, res, next){
	console.log(err);
	res.statusCode = code;
	res.send({errors: [msg]});
	next();
}

/* Validate Patch Request conforms to schema to restrict fields and values that can be patched. */
function validatePatchRequest(patch_request_array){

	patch_request_array.forEach(function(elem){
		var op = elem.op;
		var path = elem.path;
		if (op !== "add" && !(path === "/pair_match_value/-" || path === "/raw_data_device/-" || path === "/raw_data_vehicle/-" )) {
			console.log("Validation failed for ",op, path);
			return false;
		}
	});
	return true;
}

module.exports = router;




