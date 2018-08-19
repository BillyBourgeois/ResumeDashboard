'use strict';

Directives.directive('switch', function () {
    return {
        restrict: 'E',
        require: '^ngModel',
        scope: {
            ngModel: '=',
            disabled: '=?'
        },
        templateUrl: 'views/templates/switch.html',
        link: function (scope, elem, attrs) {
            scope.onClick = function (bool) {
                scope.ngModel = bool;
            };
            scope.disabled = scope.disabled != undefined ? scope.disabled : false;
        }
    };
});
