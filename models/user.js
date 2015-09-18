'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var eat = require('eat');

var userSchema = new mongoose.Schema({
  username: {
    type: String
    // required: true,
    // unique: true
  },
  basic: {
    username: {
      type: String
      // required: true,
      // unique: true
    },
    password: {
      type: String 
      // required: true
      //validator for char length?
    }
  }
});

userSchema.methods.generateHash = function(password, callback) {
  //hash password, save hash instead of password
  bcrypt.hash(password, 8, function(err, hash) {
    if (err) return callback(err);
    this.basic.password = hash;
    callback(null, hash);
  }.bind(this));
};

userSchema.methods.compareHash = function(password, callback) {
  //compare password to hashed password
  bcrypt.compare(password, this.basic.password, callback);
};

userSchema.methods.generateToken = function(callback) {
  eat.encode({id: this._id}, process.env.APP_SECRET, callback);
};

module.exports = mongoose.model('User', userSchema);