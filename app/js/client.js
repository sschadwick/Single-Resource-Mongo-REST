require('angular/angular');
var angular = window.angular;

var reviewsApp = angular.module('reviewsApp', []);

require('./services/services')(reviewsApp);
require('./filters/filters')(reviewsApp);
require('./directives/directives')(reviewsApp);
require('./reviews/reviews')(reviewsApp);
