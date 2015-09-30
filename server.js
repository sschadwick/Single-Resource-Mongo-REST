'use strict';

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/reviews_dev');
//db will be named reviews_dev

process.env.APP_SECRET = process.env.APP_SECRET || 'changemechangemechangeme';

app.use(express.static(__dirname + '/build'));

var reviewRouter = require(__dirname + '/routes/reviews_routes');
var userRouter = require(__dirname + '/routes/users_routes');
app.use('/api/', reviewRouter);
app.use('/api/', userRouter);

app.listen(port, function() {
  console.log('server is running on ' + port);
});
