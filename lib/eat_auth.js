'use strict';

var eat = require('eat');
var User = require(__dirname + '/../models/user');
var handleError = require(__dirname + '/./handle_error');
var EventEmitter = require('events').EventEmitter;
var ee = new EventEmitter();

module.exports = exports = function(req, res, next) {
  var encryptedToken = req.headers.token || (req.body? req.body.token : undefined);
  if (!encryptedToken)
    return ee.emit('return401', res);
  ee.emit('decode', encryptedToken, req, res, next);
};

ee.on('decode', function(encryptedToken, req, res, next){
  eat.decode(encryptedToken, process.env.APP_SECRET, function(err, token) {
    if (err) return handleError(err, res);
    ee.emit('findOne', req, res, next, token);
  });
});

ee.on('findOne', function(req, res, next, token) {
  User.findOne({_id: token.id}, function(err, user) {
    if (err) return handleError(err, res);
    if (!user) ee.emit('return401', res);
    req.user = user;
    next();
  });
});

ee.on('return401', function(res) {
  return res.status(401).json({msg: 'could not authenticate'});
});
