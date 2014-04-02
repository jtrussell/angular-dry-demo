/*global angular */

angular.module('dryDemo').filter('dryDemoLeftAlign', [function() {
  'use strict';
  return function(input) {
    var lines = input.split('\n');
      
    if(!lines.length) {
      return input;
    }

    if(1 === lines.length) {
      return input.replace(/^\s*/, '');
    }

    var firstLine = lines[0]
      , leadingSpace = (/^(\s*)/.exec(firstLine), RegExp.$1)
      , leadingSpaceRegExp = new RegExp('^' + leadingSpace)
      , linesLeftAligned = [];

    angular.forEach(lines, function(l) {
      linesLeftAligned.push(l.replace(leadingSpaceRegExp, ''));
    });

    return linesLeftAligned.join('\n');
  };
}]);
