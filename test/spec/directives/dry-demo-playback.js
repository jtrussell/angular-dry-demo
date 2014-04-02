/*global angular, describe, it, beforeEach, afterEach, module, inject, expect */

describe('Directive: dryDemoPlayback', function() {
  'use strict';

  var scope, compile;

  beforeEach(module('dryDemo'));

  beforeEach(inject(function($rootScope, $compile) {
    scope = $rootScope.$new();
    compile = function(tpl) {
      var $el = $compile(angular.element(tpl))(scope);
      scope.$apply();
      return $el;
    };
  }));

  var mkEl = function(arr) {
    return compile(arr.join('\n'), scope);
  };

  describe('basics', function() {
    var $el;

    beforeEach(function() {
      $el = mkEl([
        '<div>',
          '<div dry-demo="first">',
            '<p>This is some code {{1+1}}!</p>',
          '</div>',
          '<div dry-demo-playback="first"></div>',
        '</div>'
      ]);
    });
    
    it('should fill the display container with formatted code', function() {
      expect($el.children().eq(1).find('code').find('pre').html()).toBe('&lt;p&gt;This is some code {{1+1}}!&lt;/p&gt;');
    });

  });
});
