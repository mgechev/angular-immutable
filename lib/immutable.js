/* global angular, Immutable */

var immutableFilter = () => {
  return (val) => {
    if (val instanceof Immutable.Collection) {
      return val.toJS();
    }
    return val;
  };
};

angular.module('immutable', [])
  .filter('immutable', immutableFilter);
