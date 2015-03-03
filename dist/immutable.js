(function () {
"use strict";
var immutableDirective = (function() {
  var priority = 2000;
  var scope = true;
  var link = (function(scope, el, attrs) {
    var immutable = attrs.immutable;
    if (!(/^[a-zA-Z0-9_$]+$/).test(immutable)) {
      return ;
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
    link: link
  };
});
angular.module('immutable', []).directive('immutable', immutableDirective);

}());