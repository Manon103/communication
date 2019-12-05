'use strict'
var express = require('express');
var router = express.Router();
var controller = require('../../controller/public/message');
router.post('/sendMessage', controller.sendMessage);
router.get('/getMessage', controller.getMessage);
module.exports = router;
