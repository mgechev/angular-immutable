/* global angular */

var immutableDirective = () => {
  let priority = 2000;
  let scope = true;
  let restrict = 'A';
  let link = (scope, el, attrs) => {
    let { immutable } = attrs;

    if (!get(immutable, scope)) {
      console.warn(`No ${immutable} property found.`);
    }
    scope.$watch(() => {
      return get(immutable, scope.$parent);
    }, (val) => {
      scope.immutables = val.toJS();
    });
  };
  return { priority, scope, restrict, link };

  
  function get(path, obj) {
    var schema = obj;
    var pList = path.split('.');
    var len = pList.length;
    for (var i = 0; i < len - 1; i++) {
      var elem = pList[i];
      if (!schema[elem])
        schema[elem] = {};
      schema = schema[elem];
    }
    return schema[pList[len - 1]];
  }
};

module.exports = angular.module('immutable', [])
  .directive('immutable', immutableDirective)
  .name;
