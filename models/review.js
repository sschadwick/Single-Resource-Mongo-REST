'use strict';

var mongoose = require('mongoose');

function validator(v) {
  return v.length >= 10;
}

var reviewSchema = new mongoose.Schema({
  bookName: {type: String, required: true},
  author: {type: String, default: 'Anonymous'},
  reviewedBy: String,
  review: {
    type: String,
    validate: [validator, 'You need to write more']
  },
  favorite: Boolean
});

module.exports = mongoose.model('Review', reviewSchema);
