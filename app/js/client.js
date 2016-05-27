require('angular/angular');
require('angular-route');
require('angular-base64');
require('angular-cookies');
var angular = window.angular;

var reviewsApp = angular.module('reviewsApp', ['ngRoute', 'base64', 'ngCookies']);

require('./services/services')(reviewsApp);
require('./filters/filters')(reviewsApp);
require('./directives/directives')(reviewsApp);
require('./reviews/reviews')(reviewsApp);
require('./users/users')(reviewsApp);
require('./logout')(reviewsApp);
require('./router')(reviewsApp);
