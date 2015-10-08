module.exports = function(app) {
  app.directive('dummyDirective', function() {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: '/templates/directives/dummy_directive_template.html',
      scope: {
        foo: '=',
        bar: '@'
      }
    };
  });
};
