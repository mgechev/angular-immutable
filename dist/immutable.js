(function () {
"use strict";
var immutableFilter = (function() {
  return (function(val) {
    if (val instanceof Immutable.Collection) {
      return val.toJS();
    }
    return val;
  });
});
angular.module('immutable', []).filter('immutable', immutableFilter);

}());