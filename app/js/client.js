require('angular/angular');

var reviewsApp = angular.module('reviewsApp', []);

require('./services/services')(reviewsApp);
require('./directives/directives')(reviewsApp);
require('./reviews/reviews')(reviewsApp);
