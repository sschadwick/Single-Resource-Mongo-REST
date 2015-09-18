'use strict';

var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/reviews_dev');
//db will be named reviews_dev

process.env.APP_SECRET = process.env.APP_SECRET || 'changemechangemechangeme';

var reviewRouter = require(__dirname + '/routes/reviews_routes');
var userRouter = require(__dirname + '/routes/users_router');
app.use('/api', reviewRouter);
app.use('/api', userRouter);

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('server is running on ' + port);
});
