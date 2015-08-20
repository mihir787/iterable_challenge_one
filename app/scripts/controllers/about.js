'use strict';

/**
 * @ngdoc function
 * @name challengeOneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the challengeOneApp
 */
angular.module('challengeOneApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
