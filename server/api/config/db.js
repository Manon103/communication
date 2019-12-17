const mongoose = require('mongoose');
const DB_URL = 'mongodb://kyeeEditor:kyeeEditor0527@153.37.97.57:47017/kyeeEditor';
// var readline = require('readline');
mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('connected', () => {
  console.log('MongoDB connected to ' + DB_URL);
});
mongoose.connection.on('error', (err) => {
  console.log('MongoDb connection error:' + err);
});
mongoose.connection.on('disconnected', () =>  {
  console.log('MOngoDb disconnected.');
});

require('../model/userInfo');
require('../model/message');
