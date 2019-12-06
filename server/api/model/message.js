var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var messageSchema = new Schema({
  user: String,
  message: String,
  createTime: { type: Date, default: Date.now() }
}, { collection: 'message' });
module.exports = mongoose.model('message', messageSchema, 'message');
