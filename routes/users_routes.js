'use strict';

var express = require('express');
var User = require(__dirname + '/../models/user');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handle_error');
var httpBasic = require(__dirname + '/../lib/http_basic');
var EventEmitter = require('events').EventEmitter;
var ee = new EventEmitter();

var usersRouter = module.exports = exports = express.Router();

//pyramid of doom
usersRouter.post('/signup', jsonParser, function(req, res) {
  var newUser = new User();
  newUser.basic.username = req.body.username;
  newUser.username = req.body.username;

  ee.on('generateHash', function() {
    newUser.generateHash(req.body.password, function(err, hash) {
      if (err) return handleError(err, res);
      ee.emit('save');
    }.bind(this));
  });

  ee.on('save', function() {
    newUser.save(function(err, data) {
      if (err) return handleError(err, res);
      ee.emit('generateToken');
    }.bind(this));
  });

  ee.on('generateToken', function() {
    newUser.generateToken(function(err, token) {
      if (err) return handleError(err, res);
      res.json({token: token});
    }.bind(this));
  });

  ee.emit('generateHash');
});

//pyramid of doom
usersRouter.get('/signin', httpBasic, function(req, res) {
  User.findOne({'basic.username': req.auth.username}, function(err, user) {
    if (err) return handleError(err, res);
    if (!user) {
      console.log('could not authenticate user: ' + req.auth.username);
      return res.status(401).json({msg: 'could not authenticate'});
    }
    user.compareHash(req.auth.password, function(err, hashRes) {
      if (err) return handleError(err, res);
      if (!hashRes) {
        console.log('could not authenticate user ' + req.auth.username);
        return res.status(401).json({msg: 'authenticat says NON!'});
      }
      user.generateToken(function(err, token) {
        if (err) return handleError(err, res);
          res.json({token: token});
      });
    });
  });
});
