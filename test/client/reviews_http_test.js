require(__dirname + '/../../app/js/client');
require('angular-mocks');

describe('notes controller', function() {
  var $httpBackend;
  var $ControllerConstructor;
  var $scope;

  beforeEach(angular.mock.module('reviewsApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() {
    var controller = new $ControllerConstructor('ReviewsController', {$scope: $scope});
    expect(typeof $scope).toBe('object');
    expect(typeof controller).toBe('object');
    expect(Array.isArray($scope.reviews)).toBe(true);
  });

  describe('REST requests', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      $ControllerConstructor('ReviewsController', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a GET request when getAll() is called', function() {
      $httpBackend.expectGET('/api/reviews').respond(200, [{bookName: 'test book'}]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.reviews[0].bookName).toBe('test book');
    });

    it('should be able to create a book review', function() {
      $httpBackend.expectPOST('/api/reviews', {bookName: 'POST test book'}).respond(200, {_id: 1, bookName: 'test name'});
      $scope.newReview = {bookName: 'Hello'};
      $scope.createReview({bookName: 'POST test book'});
      $httpBackend.flush();
      expect($scope.reviews[0].bookName).toBe('test name');
      expect($scope.newReview).toBe(null);
    });

    it('should be able to update a book review');

    it('should be able to delete a book review', function() {
      $httpBackend.expectDELETE('/api/reviews/1').respond(200);
      var review = {bookName: 'DELETE this book', _id: 1};
      $scope.reviews.push(review);
      $scope.removeReview(review);
      $httpBackend.flush();
      expect($scope.reviews.length).toBe(0);
    });
  });
});
