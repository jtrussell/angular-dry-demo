/*global angular */

angular.module('dryDemo').directive('dryDemo', ['$compile', 'dryDemoBlocks', function($compile, dryDemoBlocks) {
  'use strict';
  return {
    restrict: 'A',
    terminal: true,
    priority: 9001, // It's over 9000!
    compile: function(element, attrs) {
      var blockId = attrs.dryDemo
        , html = element.html()
        , linkFn = $compile(element, null, 9001);

      dryDemoBlocks.set(blockId, html);

      var postLink = function(scope) {
        linkFn(scope);
      };

      return postLink;
    }
  };
}]);
