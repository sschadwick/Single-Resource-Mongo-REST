'use strict';

var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
  bookName: String,
  author: {type: String, default: 'Anonymous'},
  review: String
});

module.exports = mongoose.model('Review', reviewSchema);
//attach schema to Review
