module.exports = function(app) {
  app.controller('ReviewsController', ['$scope', '$http', function($scope, $http) {
    $scope.reviews = [];

    $scope.getAll = function() {
      $http.get('/api/reviews')
        .then(function(res) {
          $scope.reviews = res.data;
        }, function(res) {
          console.log(res);
        });
    };

    $scope.createReview = function(review) {
      $http.post('/api/reviews', review)
        .then(function(res) {
          $scope.reviews.push(res.data);
          $scope.newReview = null;
        }, function(res) {
          console.log(res);
        });
    };

    $scope.updateReview = function(review) {
      review.status = 'pending';
      $http.put('/api/reviews/' + review._id, review)
        .then(function(res) {
          delete review.status;
          review.editing = false;
        }, function(res) {
          console.log(res);
          review.status = 'failed';
          review.editing = false;
        });
    };

    $scope.editReview = function(review) {
      review.storeBookName = review.bookName;
      review.editing = true;
    };

    $scope.cancelUpdate = function(review) {
      review.bookName = review.storeBookName;
      review.editing = false;
    };

    $scope.removeReview = function(review) {
      review.status = 'pending';
      $http.delete('/api/reviews/' + review._id)
        .then(function() {
          $scope.reviews.splice($scope.reviews.indexOf(review), 1);
        }, function(res) {
          review.status = 'failed';
          console.log(res);
        });
    };


  }]);
};
