/*global angular */

angular.module('dryDemo', []);

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

/*global angular */

angular.module('dryDemo').directive('dryDemo', ['$compile', 'dryDemoBlocks', function($compile, dryDemoBlocks) {
  'use strict';
  return {
    restrict: 'A',
    terminal: true,
    priority: 9001, // It's over 9000!
    compile: function(element, attrs) {
      var blockId = attrs.dryDemo
        , linkFn = $compile(element, null, 9001);

      dryDemoBlocks.set(blockId, element.html());

      var postLink = function(scope) {
        linkFn(scope);
      };

      return postLink;
    }
  };
}]);

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

/*global angular */

angular.module('dryDemo').filter('dryDemoSanitize', [function() {
  'use strict';
  return function(input) {
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  };
}]);

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

/*global angular */

angular.module('dryDemo').factory('dryDemoBlocks', ['$q', function($q) {
  'use strict';

  var exports = {}
    , savedBlocks = {};

  var defaultId = '__dry_demo_default_id__';

  exports.get = function(id) {
    id = id || defaultId;
    if(!savedBlocks.hasOwnProperty(id)) {
      savedBlocks[id] = {
        deferred: $q.defer(),
        isResolved: false
      };
    }
    return savedBlocks[id].deferred.promise;
  };

  exports.set = function(id, block) {
    id = id || defaultId;
    if(!savedBlocks.hasOwnProperty(id) || savedBlocks[id].isResolved) {
      savedBlocks[id] = {
        deferred: $q.defer(),
        isResolved: false
      };
    }
    savedBlocks[id].deferred.resolve(block);
    savedBlocks[id].isResolved = true;
  };

  return exports;
}]);
