require('angular/angular');
require('angular-route');
var angular = window.angular;

var reviewsApp = angular.module('reviewsApp', ['ngRoute']);

require('./services/services')(reviewsApp);
require('./filters/filters')(reviewsApp);
require('./directives/directives')(reviewsApp);
require('./reviews/reviews')(reviewsApp);
require('./users/users')(reviewsApp);

reviewsApp.config(['$routeProvider', function($route) {
  $route
    .when('/reviews', {
      templateUrl: '/templates/reviews/views/reviews_view.html'
    })
    .when('/singup', {
      templateUrl: '/templates/users/views/signupin_view.html',
      controller: 'SignupController'
    })
    .otherwise({
      redirectTo: '/signup'
    });
}]);
