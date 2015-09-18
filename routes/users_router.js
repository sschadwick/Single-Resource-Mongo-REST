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

usersRouter.post('/signin', httpBasic, function(req, res) {
  User.findOne({'basic.username': req.auth.username}, function(err, user) {
    if (err) handleError(err, res);

    if (!user) {
      console.log('could not authenticate user: ' + req.auth.username);
      return res.status(401).json({msg: 'could not authenticate'});
    }
    user.compareHash(req.auth.password, function(err, hash) {
      if (err) handleError(err, res);

      if (!hashRes) {
        console.log('could not authenticate user ' + req.auth.username);
        return res.status(401).json({msg: 'authenticat says NON!'});
      }

      user.generateToken(function(err, token) {
        if (err) handleError(err, res)
          res.json({token: token});
      });
    });
  });
});
