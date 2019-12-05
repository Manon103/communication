'use strict'
var mongoose = require('mongoose');
var common = require('../common');
var express = require('express');
var server = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var UserInfo = mongoose.model('userInfo');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(session({
  secret: 'hello',
  saveUninitialized: true,
  resave: false,
}));

module.exports.login = function (req, res) {
  var item = {
    userName: req.body.userName,
    password: req.body.password
  }
  req.session.userName = item.userName;
  UserInfo.find({ 'userName': item.userName,'password': item.password }, function (err, data) {
    if (data.length !== 0) {
      common.sendResponse(res, 200, '登录成功');
    } else {
      if (err) {
        common.sendResponse(res, 500, '服务器错误');
      } else {
        common.sendResponse(res, 401, '密码错误');
      }
    }
  });
}
