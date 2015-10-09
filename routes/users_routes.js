'use strict';

var express = require('express');
var User = require(__dirname + '/../models/user');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handle_error');
var eatAuth = require(__dirname + '/../lib/eat_auth');
var httpBasic = require(__dirname + '/../lib/http_basic');
var EventEmitter = require('events').EventEmitter;
var ee = new EventEmitter();

var usersRouter = module.exports = exports = express.Router();

usersRouter.post('/signup', jsonParser, function(req, res) {
  var newUser = new User();
  newUser.basic.username = req.body.username;
  newUser.username = req.body.username;
  ee.emit('generateHash', req, res, newUser);
});

ee.on('generateHash', function(req, res, newUser) {
  newUser.generateHash(req.body.password, function(err, hash) {
    if (err) return handleError(err, res);
    ee.emit('save', req, res, newUser, hash);
  }.bind(this));
});

ee.on('save', function(req, res, newUser, hash) {
  newUser.save(function(err, data) {
    if (err) return handleError(err, res);
    ee.emit('generateToken', req, res, newUser);
  }.bind(this));
});

ee.on('generateToken', function(req, res, newUser) {
  newUser.generateToken(function(err, token) {
    if (err) return handleError(err, res);
    res.json({token: token});
  }.bind(this));
});

usersRouter.get('/username', jsonParser, eatAuth, function(req, res) {
  res.json({username: req.user.username});
});

usersRouter.get('/signin', httpBasic, function(req, res) {
  ee.emit('findOne', req, res);
});

ee.on('findOne', function(req, res) {
  User.findOne({'basic.username': req.auth.username}, function(err, user) {
    if (err) return handleError(err, res);
    if (!user) return ee.emit('return401', res);
    ee.emit('compareHash', req, res, user);
  });
});

ee.on('compareHash', function(req, res, user) {
  user.compareHash(req.auth.password, function(err, hashRes) {
    if (err) return handleError(err, res);
    if (!hashRes) return ee.emit('return401', res);
    ee.emit('generateToken', req, res, user);
  });
});

ee.on('return401', function(res) {
  return res.status(401).json({msg: 'could not authenticate'});
});

