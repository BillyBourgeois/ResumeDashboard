"use strict";

Directives.directive('spinner', ['$timeout', function ($timeout) {
    return {
        restrict: 'E',
        require: 'ngModel',
        scope: {
            ngModel: '='
        },
        transclude: true,
        templateUrl: 'views/templates/spinner.html',
        link: function (scope, element, attr,ctrl, transclude) {
            scope.spin = true;
            scope.$watch('ngModel', function (val, prevVAl) {
                if (angular.isDefined(val)) {
                    $timeout(function () {
                        scope.spin = val;
                    }, 100);
                }
            });
            transclude(scope.$parent, function (clone, scope) {
                var replaceEl = element.find('.replace').find('div');
                replaceEl.html(clone);
            });
        }
    }
}]);