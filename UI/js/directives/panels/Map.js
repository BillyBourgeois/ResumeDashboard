Directives.directive("map", [ '$log', 'toastr', function ($log, toastr) {
    return {
        templateUrl: 'views/templates/panels/map.html',
        scope: {
           
        },
        link: function (scope, element, attrs, ctrl) {
            scope.spin = true;
            scope.userEntry = scope.zipCode;

            scope.findZip = function findZip() {
                scope.zipCode = scope.userEntry;
            };
        }
    }
}]);