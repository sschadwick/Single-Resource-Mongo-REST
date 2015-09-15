'use strict';

var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/reviews_dev');
//db will be named reviews_dev

var reviewRouter = require(__dirname + '/routes/reviews_routes');
app.use('/api', reviewRouter);

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('server is running on ' + port);
});
