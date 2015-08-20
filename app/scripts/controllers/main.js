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
      grabCoutries();
      populationGeneration();
      $scope.topLanguages = topLangs();
      generateGraphs();
    })

    var grabCoutries = function() {
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
    }

    var populationGeneration = function() {
      $scope.sortedPopulation = sortedPopulation();
      $scope.totalPopulation = totalPopulation();
      $scope.notTopSixPopulation = $scope.totalPopulation - notTopSixPopulation();
    }

    var generateGraphs = function(){
      populationPieGraph();
      topLanguagesGraph($scope.topLanguages);
    }

    var sortedPopulation = function() {
      function comparePopulation(a, b) {
        var count = $scope.countries
          return b.population - a.population;
      }

      return $scope.countries.sort(comparePopulation).slice(0, 6);
    }

    var totalPopulation = function(){
      var total = 0;
      for(var i = 0; i < $scope.sortedPopulation.length; i++){
          var country = $scope.sortedPopulation[i];
          total += (country.population);
      }
      return total;
    }

    var notTopSixPopulation = function(){
      var total = 0;
      for(var i = 0; i < 6; i++){
          var country = $scope.sortedPopulation[i];
          total += (country.population);
      }
      return $scope.totalPopulation - total;
    }
>>>>>>> population

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

<<<<<<< HEAD
    var sortedPopulation = function() {
      function compareFrequency(a, b) {
          return $scope.countries[b].population - $scope.countries[a].population;
      }

      return $scope.countries.sort(compareFrequency)
    }

    var topLanguagesGraph = function (topLanguages) {
      $(function() {
=======
    var populationPieGraph = function() {
      $(function () {
        $('#container1').highcharts({
            chart: {
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45,
                    beta: 0
                }
            },
            title: {
                text: 'Top 6 Most Populated Countries Compared to the Rest of the World'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 35,
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}'
                    }
                }
            },
            series: [{
                type: 'pie',
                name: 'Population share',
                data: [
                    [$scope.sortedPopulation[0].name,   $scope.sortedPopulation[0].population / $scope.totalPopulation],
                    [$scope.sortedPopulation[1].name,       $scope.sortedPopulation[1].population / $scope.totalPopulation],
                    [$scope.sortedPopulation[2].name,    $scope.sortedPopulation[2].population / $scope.totalPopulation],
                    [$scope.sortedPopulation[3].name,     $scope.sortedPopulation[3].population / $scope.totalPopulation],
                    [$scope.sortedPopulation[4].name,   $scope.sortedPopulation[4].population / $scope.totalPopulation],
                    [$scope.sortedPopulation[5].name,   $scope.sortedPopulation[5].population / $scope.totalPopulation],
                    ["Rest of the World",   $scope.notTopSixPopulation / $scope.totalPopulation]
                ]
            }]
        });
      });
    }

    var topLanguagesGraph = function (topLanguages) {
      $(function () {
>>>>>>> population
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
<<<<<<< HEAD
    };
=======
      };

>>>>>>> population
  });
