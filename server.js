'use strict';

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/reviews_dev');
//db will be named reviews_dev

app.use(express.static(__dirname + '/build'));

process.env.APP_SECRET = process.env.APP_SECRET || 'changemechangemechangeme';

var reviewRouter = require(__dirname + '/routes/reviews_routes');
var userRouter = require(__dirname + '/routes/users_routes');
app.use('/api/', reviewRouter);
app.use('/api/', userRouter);

module.exports = app.listen(port, function() {
  console.log('server is running on ' + port);
});
