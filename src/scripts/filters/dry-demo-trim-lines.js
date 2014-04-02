/*global angular */

angular.module('dryDemo').filter('dryDemoTrimLines', [function() {
  'use strict';
  return function(input) {
    var lines = input.split('\n')
      , linesOut = [];

    // Remove leading empty lines
    angular.forEach(lines, function(l) {
      if(linesOut.length || l.trim().length) {
        // reverese...
        linesOut.unshift(l);
      }
    });

    lines = linesOut;
    linesOut = [];

    // And trailing ones
    angular.forEach(lines, function(l) {
      if(linesOut.length || l.trim().length) {
        // reverse back
        linesOut.unshift(l);
      }
    });

    return linesOut.join('\n');
  };
}]);
