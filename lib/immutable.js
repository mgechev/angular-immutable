/* global angular */

function get(path, obj) {
  let schema = obj;
  let pList = path.split('.');
  let len = pList.length;
  for (let i = 0; i < len - 1; i++) {
    let elem = pList[i];
    if (!schema[elem]) {
      throw new Error('Invalid path "' + path + '"');
    }
    schema = schema[elem];
  }
  return schema[pList[len - 1]];
}

function set(path, obj, val) {
  let schema = obj;
  let pList = path.split('.');
  let len = pList.length;
  for (let i = 0; i < len - 1; i++) {
    let elem = pList[i];
    schema[elem] = {};
    schema = schema[elem];
  }
  schema[pList[len - 1]] = val;
}

var immutableDirective = function immutableDirective() {
  var priority = 2000;
  var scope = true;
  var restrict = 'A';
  var link = function link(scope, el, attrs) {
    let { immutable } = attrs;

    if (!/^[a-zA-Z0-9_$.]+$/.test(immutable)) {
      throw new Error('The "immutable" directive accepts ' + 'as argument a variable name');
    }
    if (!get(immutable, scope.$parent)) {
      console.warn('No "' + immutable + '" property found.');
    }
    scope.$parent.$watch(function () {
      return get(immutable, scope.$parent);
    }, function (val) {
      set(immutable, scope, val.toJS());
    });
  };
  return { priority, scope, restrict, link };
};

module.exports = angular.module('immutable', [])
  .directive('immutable', immutableDirective)
  .name;

