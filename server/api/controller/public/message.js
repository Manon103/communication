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
    user: req.body.session + '&' + req.body.aimUser,
    message: req.body.msg,
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
  const queryString = req.query.user + '&' + req.query.to;
  const _queryString = req.query.to + '&' + req.query.user;
  message.find({ $or: [{ user: queryString }, { user: _queryString }] }, (err, data) => {
    if (err) {
      common.sendResponse(err, 500, '服务器错误');
    } else {
      common.sendJsonResponse(res, 200, data);
    }
  })
}
