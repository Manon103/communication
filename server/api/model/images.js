var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var imagesSchema = new Schema({
  url: String,
  userName: String,
  createTime: { type: Date, default: Date.now() },
}, { collection: 'images' });
module.exports = mongoose.model('images', imagesSchema, 'images')
