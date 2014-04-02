/*global angular */

angular.module('dryDemo').directive('dryDemoPlayback', ['$filter', '$compile', 'dryDemoBlocks', function($filter, $compile, dryDemoBlocks) {
  'use strict';
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var blockId = attrs.dryDemoPlayback;
      dryDemoBlocks.get(blockId).then(function(code) {
        
        code = $filter('dryDemoSanitize')(code);
        code = $filter('dryDemoTrimLines')(code);
        code = $filter('dryDemoLeftAlign')(code);

        element.html([
          '<code ng-non-bindable>',
            '<pre>',
              code,
            '</pre>',
          '</code>',
        ].join(''));
      });
    }
  };
}]);
