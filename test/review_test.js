'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;

process.env.MONGO_URL = 'mongodb://localhost/review_test';
require(__dirname + '/../server');
var mongoose = require('mongoose');
var url = 'localhost:3000/api/';

var Review = require(__dirname + '/../models/review');

describe('the reviews resource', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function(err) {
      if (err) throw err;
      done();
    });
  });

  it('should be able to get reviews', function(done) {
    chai.request(url)
    .get('/reviews')
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(Array.isArray(res.body)).to.eql(true);
      done();
    });
  });

  it('should create a new review', function(done) {
    chai.request(url)
    .post('/reviews')
    .send({bookName: 'It was a good book'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.bookName).to.eql('It was a good book');
      expect(res.body.author).to.eql('Anonymous');
      done();
    });
  });

  //tests that require a review to be in the db already
  //before each requires slightly more resources
  describe('routes that require a review in db', function() {
    beforeEach(function(done) {
      var testReview = new Review({bookName: 'Phonebook', review: 'Riveting story.', favorite: true});
      testReview.save(function(err, data) { //only working if review >= 10char
        if (err) console.log(err.errors.review.message);
        this.testReview = data;
        done();
      }.bind(this));
    });

    it('should be able to upload a new review', function(done) {
      chai.request(url)
      .put('/reviews/' + this.testReview._id)
      .send({bookName: 'Heres another book'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('success'); //success message is from routes
        done();
      });
    });

    it('should be able to delete a review', function(done) {
      chai.request(url)
      .delete('/reviews/' + this.testReview._id)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('success');
        done();
      });
    });

    it('should validate and ask for more characters in review object', function(done) {
      chai.request(url)
      .post('/reviews/')
      .send({bookName: 'Yet another book', review: 'too short'}) //this review should be too short
      .end(function(err, res) {
        expect(res.status).to.eql(500);
        expect(res.body.msg).to.eql('error encountered');
        done();
      });
    });
  });

  describe('favReviews path', function() {
    it('should return a list of favorited reviews', function(done) {
      chai.request(url)
      .get('/favReviews')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg.length).to.be.above(0);
        expect(res.body.msg[0].favorite).to.eql(true);
        done();
      });
    });
  });
});
