'use strict';

/**
 * @ngdoc overview
 * @name sampleApp
 * @description
 * # sampleApp
 *
 * Main module of the application.
 */
angular
  .module('sampleApp', [
    'ngCookies',
    'angularLocalStorage'
  ]).controller('CustomCtrl', function ($scope, storage) {
    storage.bind($scope, 'sampleData', {defaultValue: [1,2,3]});
    
    $scope.setValue = function() {
      var newValue = parseInt(document.getElementById('val').value);
      if($scope.sampleData.indexOf(newValue) === -1) {
        $scope.sampleData.push(parseInt(document.getElementById('val').value));
        document.getElementById('val').value = null;
      }
    };
    
  });