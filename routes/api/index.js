var router = require('express').Router();
var jwt = require('express-jwt');

var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});


// add jwt authentication for pair-session endpoints.
router.use('/pairSession',auth, require('./pairsession'));
router.use('/hooks', require('./hooks'));

// authentication
router.use('/register', require('./register'));
router.use('/login', require('./login'));

module.exports = router;

