'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
process.env.MONGO_URL = 'mongodb://localhost/reviews_test';
require(__dirname + '/../server');
var mongoose = require('mongoose');
var User = require(__dirname + '/../models/user');
// var eatauth = require(__dirname + '/../lib/eat_auth');
var httpBasic = require(__dirname + '/../lib/http_basic');
var host = 'localhost:3000/api';

describe('httpbasic', function() {
  it('should be able to handle http basic auth', function() {
    var req = { //simulate request
      headers: {
        authorization: 'Basic ' + (new Buffer('test:123')).toString('base64')
      }
    };

    httpBasic(req, {}, function() {
      expect(typeof req.auth).to.eql('object');
      expect(req.auth.username).to.eql('testuser');
      expect(req.auth.password).to.eql('foobar');
    });
  });

  describe('user already in database', function() {
    before(function(done) { //add new user to database before tests
      var user = new User();
      user.username = 'testuser';
      user.basic.username = 'testuser';
      user.generateHash('foobar123', function(err, res) {
        if (err) throw err;
        user.save(function(err, data) {
          if (err) throw err;
          user.generateToken(function(err, token) {
            if (err) throw err;
            this.token = token;
            done();
          }.bind(this));
        }.bind(this));
      }.bind(this));
    });
  });

  describe('auth', function() {
    after(function(done) {
      mongoose.db.dropDatabase(function() {
        done();
      });
    });

    it('should be able to create a new user', function(done) {
      chai.request(host)
      .post('/signup')
      .send({username: 'testuser', password: 'foobar123'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.status).to.eql(200);
        expect(res.body.token.length).to.be.above(0);
        done();
      })
    });
  });



});
