'use strict'
var express = require('express');
var mongoose = require('mongoose');
var common = require('../common');
var userInfo = mongoose.model('userInfo');
var server = express();
var bodyParser = require('body-parser');

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

// 验证此人是否存在
module.exports.validateSearchInfo = function (req, res) {
  var searchInfo = req.query.searchInfo;
  userInfo.find({$or: [{ 'userName': searchInfo }, {'email':searchInfo}] }, (err, data)=>{
    if (err) {
      common.sendResponse(err, 500, '服务器错误');
    } else {
      common.sendJsonResponse(res, 200, data);
    }
  })
}

// 添加
module.exports.addFriends = function (req, res) {
  userInfo.update({ userName: req.body.userName }, { $addToSet: { friendList: req.body.friendName } }, (err, data) => {
    if (err) {
      common.sendResponse(err, 500, '服务器错误');
    } else {
      common.sendResponse(res, 200, '添加成功');
    }
  });
}



