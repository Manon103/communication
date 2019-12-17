var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var logger = require('morgan');
var pathname = __dirname;

// 引入模块
var Server = require('ws').Server;
require('./api/config/db');
var loginRouter = require('./api/routes/public/login');
var registerRouter = require('./api/routes/public/register');
var sendMessageRouter = require('./api/routes/public/message');
var addFriendRouter = require('./api/routes/public/addFriend');
var uploadFilesRouter = require('./api/controller/public/uploadFile');

var app = express();
app.use(session({
  secret: 'hello',
  saveUninitialized: true,
  resave: false,
}));

// var socketSet = new Set();
// 允许跨域
app.use(function (req, res, next) {

  // angular项目启动端口是4200，设置该网址可以对服务器进行访问
  res.setHeader('Access-Control-Allow-Origin', '*');

  // 设置允许进行的跨域方法
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');

  // 设置未true时，在发送请求时，带上cookie信息
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// 设置服务器端口
const wsServer = new Server({ port: 8085 });
let socketSet = new Set();  // webSocket的连接是以set结构，而非数组

wsServer.on('connection', (websocket, req) => {

  // 获取url中传来的参数作为用户唯一标识
  const id = req.url.split('=')[1];
  websocket.id = id;
  socketSet.add(websocket);
  websocket.on('message', data => {
    socketSet.forEach(ws => {
      if (JSON.parse(data).aimUser === ws.id) {
        if (ws.readyState == 1) {
          ws.send(data);
        } else {
          socketSet.delete(ws);
        }
      }
    });
  });
});
//静态文件访问
app.use(express.static(pathname));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/immediate-communication', loginRouter);
app.use('/immediate-communication', registerRouter);
app.use('/immediate-communication', sendMessageRouter);
app.use('/immediate-communication', addFriendRouter);
app.use('/immediate-communication', uploadFilesRouter);

module.exports = app;
