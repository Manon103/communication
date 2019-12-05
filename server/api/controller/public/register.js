'use strict'
var express = require('express')
var mongoose = require('mongoose');
var common = require('../common');
var userInfo = mongoose.model('userInfo');
var server = express();
const bodyParser = require('body-parser');

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
module.exports.register = function (req, res) {
  var item = {
    userName: req.body.userName,
    email: req.body.email,
    password:req.body.password
  }
  userInfo.find({ 'userName': item.userName }, function (err, data) {
    if (data.length!==0) {
      res.send('用户名已存在！');
    } else {
      userInfo.create(item, (err, data) => {
        if (err) {
          common.sendJsonResponse(res, 500, err);
        } else {
        common.sendResponse(res, 200, '注册成功');
        }
      });
    }
  });
}
