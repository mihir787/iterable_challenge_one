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
      topLanguagesGraph($scope.topLanguages)
      sortedPopulation();
    })

    var topLangs = function () {
      var frequency = {}, value;

      for(var i = 0; i < $scope.allLanguages.length; i++) {
          value = $scope.allLanguages[i];
          if(value in frequency) {
              frequency[value]++;
          }
          else {
              frequency[value] = 1;
          }
      }

      var uniques = [];
      for(value in frequency) {
          uniques.push(value);
      }

      function compareFrequency(a, b) {
          return frequency[b] - frequency[a];
      }

      $scope.langFrequency = frequency;
      return uniques.sort(compareFrequency).slice(0, 10);
    }

    var sortedPopulation = function() {
      function compareFrequency(a, b) {
          return $scope.countries[b].population - $scope.countries[a].population;
      }

      return $scope.countries.sort(compareFrequency)
    }

    var topLanguagesGraph = function (topLanguages) {
      $(function() {
      $('#container').highcharts({
          chart: {
              type: 'column'
          },
          title: {
              text: 'Top Ten World Wide National Languages'
          },
          subtitle: {
              text: 'Note: Most countries have multiple national languages.'
          },
          xAxis: {
              type: 'Language',
              categories: topLanguages
          },
          yAxis: {
              title: {
                  text: 'Countries per Language'
              }

          },
          legend: {
              enabled: false
          },
          plotOptions: {
              series: {
                  borderWidth: 0,
                  dataLabels: {
                      enabled: false
                  }
              }
          },

          tooltip: {
              headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
              pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> countries<br/>'
          },

          series: [{
              name: "Language",
              colorByPoint: true,
              data: [{
                  name: topLanguages[0],
                  y: $scope.langFrequency[topLanguages[0]],
              }, {
                  name: topLanguages[1],
                  y: $scope.langFrequency[topLanguages[1]],
              }, {
                  name: topLanguages[2],
                  y: $scope.langFrequency[topLanguages[2]],
              }, {
                  name: topLanguages[3],
                  y: $scope.langFrequency[topLanguages[3]],
              }, {
                  name: topLanguages[4],
                  y: $scope.langFrequency[topLanguages[4]],
              }, {
                  name: topLanguages[5],
                  y: $scope.langFrequency[topLanguages[5]],
              }, {
                  name: topLanguages[6],
                  y:$scope.langFrequency[topLanguages[6]],
              }, {
                  name: topLanguages[7],
                  y: $scope.langFrequency[topLanguages[7]],
              }, {
                  name: topLanguages[8],
                  y: $scope.langFrequency[topLanguages[8]],
              }, {
                  name: topLanguages[9],
                  y: $scope.langFrequency[topLanguages[9]],
              }]
          }]
        });
      });
    };
  });
