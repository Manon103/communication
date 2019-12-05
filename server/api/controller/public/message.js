'use strict'
var express = require('express');
var mongoose = require('mongoose');
var common = require('../common');
var message = mongoose.model('message');
var server = express();
var bodyParser = require('body-parser');

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
module.exports.sendMessage = function (req, res) {
  var item = {
    userName: req.body.session,
    message: req.body.msg,
    // aimUser: req.body.aimUser
  }
  message.create(item, (err, data) => {
    if (err) {
      common.sendResponse(err, 500, '服务器错误');
    } else {
      common.sendResponse(res, 200, '发送成功');
    }
  })
}
// , 'aimUser': req.query.to
module.exports.getMessage = function (req, res) {
  message.find({ 'userName': req.query.user}, (err, data) => {
    if (err) {
      common.sendResponse(err, 500, '服务器错误');
    } else {
      common.sendJsonResponse(res, 200, data);
    }
  })
}
