/* global angular */

var immutableDirective = () => {
  let priority = 2000;
  let scope = true;
  let link = (scope, el, attrs) => {
    var expr = attrs.immutable;
    if (!(/^[a-zA-Z0-9_$]+$/).test(expr)) {
      return;
    }
    if (!scope[expr]) {
      console.warn('No ' + expr + ' property found.');
    }
    scope.$watch(function () {
      return scope.$parent[expr];
    }, function (val) {
      scope[expr] = val.toJS();
    });
  };
  return { priority, scope, link };
};

angular.module('immutable', [])
  .directive('immutable', immutableDirective);
