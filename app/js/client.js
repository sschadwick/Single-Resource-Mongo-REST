require('angular/angular');

var reviewsApp = angular.module('reviewsApp', []);

require('./services/service')(reviewsApp);
require('./directives/directives')(reviewsApp);
require('./reviews/reviews')(reviewsApp);
