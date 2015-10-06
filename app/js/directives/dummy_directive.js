module.exports = function(app) {
  app.directive('dummyDirective', function() {
    return {
      restrict: 'A',
      replace: true,
      template: '<form><h1>{{greeting}}</h1><input type="text" data-ng-model="greeting"></form>'
    };
  });
};
