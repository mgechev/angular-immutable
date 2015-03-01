(function () {
"use strict";
var immutableDirective = (function() {
  var priority = 2000;
  var scope = true;
  var link = (function(scope, el, attrs) {
    var expr = attrs.immutable;
    if (!(/^[a-zA-Z0-9_$]+$/).test(expr)) {
      return ;
    }
    if (!scope[expr]) {
      console.warn('No ' + expr + ' property found.');
    }
    scope.$watch(function() {
      return scope.$parent[expr];
    }, function(val) {
      scope[expr] = val.toJS();
    });
  });
  return {
    priority: priority,
    scope: scope,
    link: link
  };
});
angular.module('immutable', []).directive('immutable', immutableDirective);

}());