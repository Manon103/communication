var express = require('express');
var Router = express.Router();
var mongoose = require('mongoose');
var common = require('../../controller/common');
var images = mongoose.model('images');
var multer = require('multer');
var moment = require('moment');
var timestamp = '';
var timepath = moment().format('YYYY-MM-DD');
var destination = '/upload/' + timepath;
var filename = '';

var storage = multer.diskStorage({
    //这里destination是一个字符串
    destination: './server' + destination,
    filename: function (req, file, cb){
        //自定义设置文件的名字
        timestamp = new Date().getTime();
        filename = 'upload-' + timestamp + '.' + file.originalname.split('.')[1];
        cb(null, filename)
    }
});

var upload = multer({
    storage: storage
});

//处理来自页面的ajax请求。单文件上传
//多文件上传使用upload.array('file', number)
Router.post('/uploadFiles', upload.array('demo', 3), function (req, res, next) {
    //拼接文件上传后的路径
  var url = 'http://' + req.headers.host + destination + '/' + filename;
  var userName = req.body.userName;
  var item = {
    url: url,
    userName: userName
  }
  images.create(item, (err, data) => {
    if (err) {
      common.sendResponse(err, 500, '服务器错误');
    }else {
      common.sendJsonResponse(res, 200, url);
    }
  })
});

module.exports = Router;
