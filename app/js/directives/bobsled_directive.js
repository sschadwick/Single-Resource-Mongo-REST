module.exports = function(app) {
  app.directive('bobsled', function() {
    return {
      restrict: 'AC',
      templateUrl: '/templates/directives/bobsled_directive_template.html',
      transclude: true,
      scope: {
        title: '@'
      },
      controller: function($scope) {
        $scope.description = 'cool runnins bobsled mon';
      }

    };
  });
};
