'use strict';

var Review = require(__dirname + '/../models/review');
var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var handleError = require(__dirname + '/../lib/handle_error');

var reviewsRoute = module.exports = exports = express.Router();

reviewsRoute.get('/reviews', function(req, res) {
  Review.find({}, function(err, data) {
    if (err) handleError(err, res);
    res.json(data);
  });
});

reviewsRoute.post('/reviews', jsonParser, function(req, res) {
  var newReview = new Review(req.body);
  newReview.save(function(err, data) {
    if (err) handleError(err, res);
    res.json(data);
  });
});

reviewsRoute.put('/reviews/:id', jsonParser, function(req, res) {
  var newReviewBody = req.body;
  delete newReviewBody._id;

  Review.update({_id: req.params.id}, newReviewBody, function(err, data) {
    if (err) handleError(err, res);
    res.json({msg: 'success'}); //this msg is for confirmation in testing
  });
});

reviewsRoute.delete('/reviews/:id', function(req, res) {
  Review.remove({_id: req.params.id}, function(err) {
    if (err) handleError(err, res); //might not need res here
    res.json({msg: 'success'});
  });
});
