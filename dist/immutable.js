(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.angularImmutable = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/* global angular */

function get(path, obj) {
  var schema = obj;
  var pList = path.split('.');
  var len = pList.length;
  for (var i = 0; i < len - 1; i++) {
    var elem = pList[i];
    if (!schema[elem]) {
      throw new Error('Invalid path "' + path + '"');
    }
    schema = schema[elem];
  }
  return schema[pList[len - 1]];
}

function set(path, obj, val) {
  var schema = obj;
  var pList = path.split('.');
  var len = pList.length;
  for (var i = 0; i < len - 1; i++) {
    var elem = pList[i];
    schema[elem] = {};
    schema = schema[elem];
  }
  schema[pList[len - 1]] = val;
}

var immutableDirective = function immutableDirective($log) {
  var priority = 2000;
  var scope = true;
  var restrict = 'A';
  var link = function link(scope, el, attrs) {
    var immutable = attrs.immutable;


    if (!/^[a-zA-Z0-9_$.]+$/.test(immutable)) {
      throw new Error('The "immutable" directive accepts ' + 'as argument a variable name');
    }
    if (!get(immutable, scope.$parent)) {
      $log.warn('No "' + immutable + '" property found.');
    }
    scope.$parent.$watch(function () {
      return get(immutable, scope.$parent);
    }, function (val) {
      if (!val) return $log.warn('Property "' + immutable + '" does not exist.');
      if (typeof val.toJS !== 'function') return $log.warn('Property "' + immutable + '" does not seem to be an immutable object.');
      set(immutable, scope, val.toJS());
    });
  };
  return { priority: priority, scope: scope, restrict: restrict, link: link };
};

immutableDirective.$inject = ['$log'];

module.exports = angular.module('immutable', []).directive('immutable', immutableDirective).name;

},{}]},{},[1])(1)
});