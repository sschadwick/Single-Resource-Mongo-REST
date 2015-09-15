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
    .send({bookName: 'Shitty book'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.bookName).to.eql('Shitty book');
      expect(res.body.author).to.eql('Anonymous');
      done();
    });
  });

  //tests that require a review to be in the db already
  //before each requires slightly more resources
  describe('routes that require a review in db', function() {
    beforeEach(function(done) {
      var testReview = new Review({bookName: 'Art of War'});
      testReview.save(function(err, data) {
        if (err) throw err;
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
  });
});
