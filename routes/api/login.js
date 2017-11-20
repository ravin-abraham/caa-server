var router = require('express').Router();
var database = require('../../database');
var jwt = require('express-jwt');


//Authenticate User.
router.post('/', function(req, res, next) {

  var email = req.body.email;
  var password = req.body.password;  
  
  database.validateLogin(email,password)
  .then(function(result){

    //Generate jwt token
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);    
    var token = jwt.sign(
    {
      email: email,
      exp: parseInt(expiry.getTime() / 1000)
    }, "MY_SECRET");
    
    return res.send({ "token" : token });
    next();
  })
  .catch(function (err) {
    console.log(err);
    res.statusCode = 500;
    res.send({errors: ['Error Processing Login']});
    next();
  })
});


module.exports = router;


