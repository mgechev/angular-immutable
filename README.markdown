# Angular Immutable

Angular Immutable is a simple directive, which allows binding of [Immutable.js](https://github.com/facebook/immutable-js) collections.

# Demo

```javascript
/* global Immutable, angular */

var sampleApp = angular.module('sampleApp', ['immutable']);

function SampleCtrl($scope) {
  $scope.list = Immutable.List([1, 2, 3]);
}

sampleApp.controller('SampleCtrl', SampleCtrl);
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title></title>
</head>
<body ng-app="sampleApp" ng-controller="SampleCtrl">
<ul>
  <li immutable="list" ng-repeat="item in list track by $index" ng-bind="item"></li>
</ul>
<script src="/javascripts.js"></script>
</body>
</html>
```

### Result

* 1
* 2
* 3

# License

MIT