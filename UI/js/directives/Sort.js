Directives.directive("sort", function () {
    return {
        transclude: true,
        templateUrl: 'views/templates/sort.html',
        scope: {
            order: '=',
            by: '=',
            reverse: '=',
            ngModel: '='
        },
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {
            scope.updateModel = function (order) {
                ctrl.$setViewValue(order);
            };
            scope.onClick = function onClick() {
                if (scope.order === ctrl.$modelValue) {
                    scope.reverse = !scope.reverse
                } else {
                    scope.reverse = false;
                }
                scope.updateModel(scope.order);
            };
        }
    }
});