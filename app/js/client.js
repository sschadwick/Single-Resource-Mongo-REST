require('angular/angular');

var reviewsApp = angular.module('reviewsApp', []);

require('./reviews/reviews')(reviewsApp);
