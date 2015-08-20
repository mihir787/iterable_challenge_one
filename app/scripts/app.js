'use strict';

/**
 * @ngdoc overview
 * @name challengeOneApp
 * @description
 * # challengeOneApp
 *
 * Main module of the application.
 */
angular
  .module('challengeOneApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
