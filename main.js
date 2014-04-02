/*global angular */

angular.module('demoApp', ['dryDemo']);

angular.module('demoApp').controller('MainCtrl', function() {
  'use strict';
  this.bag = ['one', 'two', 'three'];
});
