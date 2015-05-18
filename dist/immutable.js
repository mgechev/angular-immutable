(function () {
"use strict";
var immutableDirective = (function() {
  var priority = 2000;
  var scope = true;
  var restrict = 'A';
  var link = (function(scope, el, attrs) {
    var immutable = attrs.immutable;
    if (!(/^[a-zA-Z0-9_$]+$/).test(immutable)) {
      throw new Error('The "immutable" directive accepts ' + 'as argument a variable name');
    }
    if (!scope[immutable]) {
      console.warn(("No " + immutable + " property found."));
    }
    scope.$watch((function() {
      return scope.$parent[immutable];
    }), (function(val) {
      scope[immutable] = val.toJS();
    }));
  });
  return {
    priority: priority,
    scope: scope,
    restrict: restrict,
    link: link
  };
});
angular.module('immutable', []).directive('immutable', immutableDirective);

}());