var router = require('express').Router();

// split up route handling
router.use('/pairSession', require('./pairsession'));
router.use('/hooks', require('./hooks'));

module.exports = router;

