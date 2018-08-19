'use strict';

Directives.directive('outputText', function () {
    return {
        restrict: 'E',
        scope: {
            model: '=',
            name: '@',
            label: '@?',
            width: '@?',
            url: '@?'
        },
        templateUrl: 'views/templates/output-text.html',
        link: function (scope, elem, attrs) {
            scope.label = scope.label != undefined ? scope.label : '';            
            scope.width = scope.width != undefined ? scope.width : 'lg';            
        }
    };
});