module.exports = function(app) {
  app.controller('ReviewsController', ['$scope', 'Resource', '$http', function($scope, Resource, $http) {
    $scope.reviews = [];
    $scope.newReview = {};
    var reviewsResource = Resource('reviews');

    $scope.description = 'this is my app description';

    $scope.printDescription = function(description) {
      console.log('from the function: ' + description);
      console.log('from $scope: ' + $scope.description);
    };

    $scope.getAll = function() {
      reviewsResource.getAll(function(err, data) {
        if (err) {return console.log(err);}
        $scope.reviews = data;
      });
    };

    $scope.createReview = function(review) {
      reviewsResource.create(review, function(err, data) {
        if (err) {return console.log(err);}
        $scope.newReview = {};
        $scope.reviews.push(data);
      });
    };

    $scope.updateReview = function(review) {
      reviewsResource.update(review, function(err) {
        if (err) {return console.log(err);}
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
      reviewsResource.remove(review, function(err) {
        if (err) {return console.log(err);}
        $scope.reviews.splice($scope.reviews.indexOf(review), 1);
      });
    };

  }]);
};
