'use strict';

var mongoose = require('mongoose');

function validator (v) {
  return v.length > 10; //make review be more than 10 char
}

var reviewSchema = new mongoose.Schema({
  bookName: {type: String, required: true},
  author: {type: String, default: 'Anonymous'},
  review: {
    type: String,
    validate: [validator, 'You need to write more']
  }
});

module.exports = mongoose.model('Review', reviewSchema);
//attach schema to Review
