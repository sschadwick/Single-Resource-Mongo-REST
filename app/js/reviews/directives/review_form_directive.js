module.exports = function(app) {
  app.directive('reviewForm', function() {
    return {
      restrict: 'AC',
      replace: true,
      templateUrl: '/templates/reviews/directives/review_form_template.html',
      scope: {
        labelText: '@',
        buttonText: '@',
        review: '=',
        save: '&'
      },
      controller: function($scope) {
        console.log($scope.save);
      }
    };
  });
};
