'use strict';

var Review = require(__dirname + '/../models/review');
var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var handleError = require(__dirname + '/../lib/handle_error');
var eatAuth = require(__dirname + '/../lib/eat_auth');

var reviewsRoute = module.exports = exports = express.Router();

reviewsRoute.get('/reviews', jsonParser, eatAuth, function(req, res) {
  Review.find({reviewedBy: req.user.username}, function(err, data) {
    if (err) handleError(err, res);
    res.json(data);
  });
});

reviewsRoute.post('/reviews', jsonParser, eatAuth, function(req, res) {
  var newReview = new Review(req.body);
  newReview.reviewedBy = req.user.username;
  newReview.save(function(err, data) {
    if (err) handleError(err, res);
    res.json(data);
  });
});

reviewsRoute.put('/reviews/:id', jsonParser, eatAuth, function(req, res) {
  var newReviewBody = req.body;
  delete newReviewBody._id;

  Review.update({_id: req.params.id}, newReviewBody, function(err, data) {
    if (err) handleError(err, res);
    res.json({msg: 'success'}); //this msg is for confirmation in testing
  });
});

reviewsRoute.delete('/reviews/:id', jsonParser, eatAuth, function(req, res) {
  Review.remove({_id: req.params.id}, function(err) {
    if (err) handleError(err, res); //might not need res here
    res.json({msg: 'success'});
  });
});

reviewsRoute.get('/favReviews', jsonParser, function(req, res) {
  Review.find({'favorite': 'true'}, 'bookName review favorite', function(err, fav) {
    if (err) throw err;
    res.json({msg: fav});
  });
});
