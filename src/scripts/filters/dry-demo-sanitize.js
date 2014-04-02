/*global angular */

angular.module('dryDemo').filter('dryDemoSanitize', [function() {
  'use strict';
  return function(input) {
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  };
}]);
