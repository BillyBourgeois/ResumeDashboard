Directives.directive('dable', ['toastr', '$location', 
    '$filter', '$log', 'API',
    function (toastr, $location, 
        $filter, $log, API) {
        return {
            restrict: 'E',
            require: '^ngModel',
            scope: {
                ngModel: '=',
                width: '@?',
                refresh: '=?',

                hideId: '=?',
                hideName: '=?',
                hideDescription: '=?',
                hideYears: '=?',
                hideProficiency: '=?'
            },
            templateUrl: 'views/templates/data-table.html',
            link: function (scope, elem, attrs, ctrl) {
                scope.spin = true;
                scope.$watch('ngModel', function (val) {
                    if (val) {
                        scope.spin = false;
                    }
                    else {
                        scope.spin = true;
                    }
                });
                scope.showRefresh = function showRefresh() {
                    if (angular.isDefined(scope.refresh)) {
                        return true;
                    }
                    else {
                        return false;
                    }
                };
                scope.width = scope.width != undefined ? scope.width : 'lg';
                scope.order = 'name';

                scope.idFilter = {
                    property: 'id',
                    range: ''
                };

                scope.nameFilter = {
                    property: 'name',
                    items: []
                };
                scope.descriptionFilter = {
                    property: 'description',
                    items: []
                };
                scope.yearsFilter = {
                    property: 'years',
                    range: ''
                };
                scope.proficiencyFilter = {
                    property: 'proficiency',
                    items: [
                        new filterItem("NA"),
                        new filterItem("Beginner"),
                        new filterItem("Intermediate"),
                        new filterItem("Expert"),
                    ]
                };

                scope.perPage = angular.isDefined(scope.perPage) ? scope.perPage : 20;
                scope.currentPage = 1;


            }
        }
    }]);