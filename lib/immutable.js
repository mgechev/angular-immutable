/* global angular */

var immutableDirective = () => {
  let priority = 2000;
  let scope = true;
  let link = (scope, el, attrs) => {
    let { immutable } = attrs;
    if (!(/^[a-zA-Z0-9_$]+$/).test(immutable)) {
      return;
    }
    if (!scope[immutable]) {
      console.warn(`No ${immutable} property found.`);
    }
    scope.$watch(() => {
      return scope.$parent[immutable];
    }, (val) => {
      scope[immutable] = val.toJS();
    });
  };
  return { priority, scope, link };
};

angular.module('immutable', [])
  .directive('immutable', immutableDirective);
