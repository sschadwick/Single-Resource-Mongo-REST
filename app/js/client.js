require('angular/angular');

var reviewsApp = angular.module('reviewsApp', []);

reviewsApp.controller('reviewsController', ['$scope', function($scope) {
  $scope.greeting = 'Salutations';
}]);
