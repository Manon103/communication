'use strict'
var multer = require('multer');

var common = {
  sendJsonResponse: function (res, status, json) {
    res.status(status);
    return res.json(json);
  },
  sendResponse: function (res, status, msg) {
    res.status(status);
    return res.send(msg);
  }
}

module.exports = common;
