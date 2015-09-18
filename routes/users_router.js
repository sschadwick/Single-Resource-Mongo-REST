'use strict';

var express = require('express');
var User = require(__dirname + '/../models/user');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handle_error');
var httpBasic = require(__dirname + '/../lib/http_basic');

var usersRouter = module.exports = exports = express.Router();

usersRouter.post('/signup', jsonParser, function(req, res) {
  var newUser = new User();
  newUser.basic.username = req.body.username;
  newUser.username = req.body.username;
  newUser.generateHash(req.body.password, function(err, hash) {
    if (err) handleError(err, res);
    newUser.save(function(err, data) {
      if (err) handleError(err, res);
      newUser.generateToken(function(err, token) {
        if(err) handleError(err, res);
        res.json({token: token});
      });
    });
  });
});
