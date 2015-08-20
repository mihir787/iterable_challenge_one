'use strict';

/**
 * @ngdoc function
 * @name challengeOneApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the challengeOneApp
 */
angular.module('challengeOneApp')
  .controller('MainCtrl', function ($scope, $http) {
    var req = {
      method: 'GET',
      url: 'https://restcountries-v1.p.mashape.com/all',
      headers: {
        'X-Mashape-Key': "FoP7J2FVnBmshSgwzlHmhiy2hk6lp1NqIHKjsnIihMurvjkm43",
        'Accept': "application/json"
      }
    }

    $http(req).then(function(response) {
      $scope.countries = response.data

    }).then(function() {
      $scope.regionNames = []
      $scope.subRegionNames = []
      $scope.allLanguages = []
      angular.forEach($scope.countries,function(country, index){
        if ($scope.regionNames.indexOf(country.region) == -1 && country.region != "") $scope.regionNames.push(country.region);
        if ($scope.subRegionNames.indexOf(country.subregion) == -1 && country.region != "") $scope.subRegionNames.push(country.subregion);
        for (var i = 0; i < country.languages.length; i++) {
          $scope.allLanguages.push(country.languages[i])
        }
      })
      $scope.topLanguages = topLangs();
    })
    var topLangs = function() {
      var frequency = {};

      $scope.allLanguages.forEach(function(language) { frequency[language] = 0; });

      var uniques = $scope.allLanguages.filter(function(value) {
        return ++frequency[value] == 1;
      });

      return uniques

      // return uniques.sort(function(a, b) {
      //   return frequency[b] - frequency[a];
      // });
    }

  });
