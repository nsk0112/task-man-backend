var express = require('express');
var router = express.Router();


var ctrlAuth = require('../controllers/AuthController');

router.post('/', ctrlAuth.auth);



module.exports = router;


