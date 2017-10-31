var router = require('express').Router();
var database = require('../../database');


//Drop All Collections
router.get('/drop', function(req, res, next) {
  database.dropCollections()
  .then(function(result){
    res.send({ status : result });
    next();
  })
  .catch(function (err) {
    console.log(err);
    res.statusCode = 500;
    res.send({errors: ['Error Executing Drop Collection']});
    next();
  })
});

module.exports = router;