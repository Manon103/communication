'use strict'
var multer = require('multer');

var common = {
  sendJsonResponse: function (res, status, json) {
    res.header('Access-Control-Allow-Origin', '*');     // angular项目启动端口是4200，设置该网址可以对服务器进行访问
    res.header('Access-Control-Allow-Methods', 'POST,GET,DELETE,PUT');      // 设置允许进行的跨域方法
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');   // 由于需要对用户身份进行验证，所以...
    // res.header('Access-Control-Allow-Credentials', 'true');   // 发送ajax时，带上cookie信息
    res.status(status);
    return res.json(json);
  },
  sendResponse: function (res, status, msg) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.header('Access-Control-Allow-Mathods', 'POST,GET,DELETE,PUT');
    res.status(status);
    return res.send(msg);
  }
}

module.exports = common;
