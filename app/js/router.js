module.exports = function(reviewsApp) {
  reviewsApp.config(['$routeProvider', function($route) {
    $route
      .when('/reviews', {
        templateUrl: '/templates/reviews/views/reviews_view.html'
      })
      .when('/signup', {
        templateUrl: '/templates/users/views/signupin_view.html',
        controller: 'SignupController'
      })
      .when('/signin', {
        templateUrl: '/templates/users/views/signupin_view.html',
        controller: 'SigninController'
      })
      .otherwise({
        redirectTo: '/signin'
      });
  }]);
};
