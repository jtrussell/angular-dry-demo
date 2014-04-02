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
