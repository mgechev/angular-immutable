/* global Immutable, angular */

var sampleApp = angular.module('sampleApp', ['immutable']);

function buildCollection(size) {
  'use strict';
  var res = [];
  for (var i = 0; i < size; i += 1) {
    res.push(Math.random());
  }
  return res;
}

function SampleCtrl($scope, $timeout) {
  'use strict';
  var runs = 0;
  var SIZE = 50000;
  var TOTAL = 100;
  var start = Date.now();
  $scope.list = Immutable.List(buildCollection(SIZE));
  function changeCollection() {
    if (runs >= TOTAL) {
      console.log('%cDone!',
          'font-size: 50px; color: blue;' +
          'font-weight: bold; font-family: impact;');
      console.log('%c' + ((Date.now() - start) / 1000) +
          ' seconds required.', 'font-size: 30px; color: red;');
      return;
    }
    $timeout(function () {
      var idx = Math.random() * SIZE - 1;
      $scope.list = $scope.list.set(idx, Math.random());
      runs += 1;
      changeCollection();
    }, 0);
  }
  changeCollection();
}

sampleApp.controller('SampleCtrl', SampleCtrl);

