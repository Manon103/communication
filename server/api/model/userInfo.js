var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userInfoSchema = new Schema({
  email: String,
  userName: String,
  password: String,
  friendList: { type: Array, default: [] },
  createTime: { type: Date, default: Date.now() },
  updateBy: String,
  updateTime: Date
},{ collection: 'userInfo'});
module.exports = mongoose.model('userInfo', userInfoSchema, 'userInfo');
