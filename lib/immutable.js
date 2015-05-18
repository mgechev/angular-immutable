/* global angular */

var immutableDirective = () => {
  let priority = 2000;
  let scope = true;
  let restrict = 'A';
  let link = (scope, el, attrs) => {
    let { immutable } = attrs;
    if (!(/^[a-zA-Z0-9_$]+$/).test(immutable)) {
      throw new Error('The "immutable" directive accepts ' +
          'as argument a variable name');
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
  return { priority, scope, restrict, link };
};

angular.module('immutable', [])
  .directive('immutable', immutableDirective);
