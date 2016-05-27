require('../../app/js/client');

describe('resource service', function() {
  beforeEach(angular.mock.module('reviewsApp'));

  var ResourceService;
  var $httpBackend;
  var reviewsResource;

  beforeEach(angular.mock.inject(function(Resource, _$httpBackend_) {
    ResourceService = Resource;
    $httpBackend = _$httpBackend_;
    reviewsResource = ResourceService('reviews');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should make a get request', function() {
    $httpBackend.expectGET('/api/reviews').respond(200, [{noteBody: 'test review', _id: 1}]);
    reviewsResource.getAll(function(err, data) {
      expect(err).toBe(null);
      expect(Array.isArray(data)).toBe(true);
    });
    $httpBackend.flush();
  });

});
