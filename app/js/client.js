require('angular/angular');

var notesApp = angular.module('notesApp', []);

notesApp.controller('notesController', ['$scope', function($scope) {
  $scope.greeting = 'hello world';
}]);
