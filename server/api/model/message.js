var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var messageSchema = new Schema({
  userName: String,
  message: String,
  createTime: { type: Date, default: Date.now() },
  aimUser: String
}, { collection: 'message' });
module.exports = mongoose.model('message', messageSchema, 'message');
