module.exports = function(app) {
  app.controller('ReviewsController', ['$scope', 'Resource', '$http', function($scope, Resource, $http) {
    $scope.reviews = [];
    $scope.newReview = {};
    var reviewsResource = Resource('reviews');

    $scope.description = 'Write or read reviews for your favorite books. Do it. You will enjoy this app.';

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
      if (!review.author) review.author = 'Anonymous';
      reviewsResource.update(review, function(err) {
        if (err) {return console.log(err);}
        review.editing = false;
      });
    };

    $scope.editReview = function(review) {
      review.storeBookName = review.bookName;
      review.storeAuthor = review.author;
      review.storeReview = review.review;
      review.editing = true;
    };

    $scope.cancelUpdate = function(review) {
      review.bookName = review.storeBookName;
      review.author = review.StoreAuthor;
      review.review = review.storeReview;
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
