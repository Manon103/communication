'use strict'
var express = require('express');
var router = express.Router();
var addFriend = require('../../controller/public/addFriend');
router.get('/validateSearchInfo', addFriend.validateSearchInfo);
router.post('/addFriend', addFriend.addFriends);

module.exports = router;
