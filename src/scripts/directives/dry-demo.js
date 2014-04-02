/*global angular */

angular.module('dryDemo').directive('dryDemo', ['dryDemoBlocks', function(dryDemoBlocks) {
  'use strict';
  return {
    restrict: 'A',
    // compile: function(tElement, tAttrs, transclude) {
    //   return {
    //     pre: function(scope, element, attrs) {
    //       // tElement.html() still has <!-- 
    //     }
    //   };
    // }
    link: {
      pre: function(scope, element, attrs) {
        var blockId = attrs.dryDemo;
        dryDemoBlocks.set(blockId, element.html());
      }
    }
  };
}]);
