'use strict'
var express = require ('express');
var router = express.Router();
var controller  = require('../../controller/public/register')
router.post('/register', controller.register);
module.exports = router;
