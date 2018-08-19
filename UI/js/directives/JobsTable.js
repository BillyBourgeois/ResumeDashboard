Directives.directive('jobsTable', ['toastr', '$location',
    '$filter', '$log', 'API',
    function (toastr, $location,
        $filter, $log, API) {
        return {
            restrict: 'E',
            require: '^ngModel',
            scope: {
                ngModel: '=',
                width: '@?',
                refresh: '=?'
            },
            templateUrl: 'views/templates/jobs-table.html',
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

                scope.companyNameFilter = {
                    property: 'company.name',
                    items: []
                };
                scope.startDateFilter = {
                    property: 'startDate',
                    minDate: null,
                    maxDate: null,
                    startDate: null,
                    endDate: null,
                    clauseBuilder: null
                };
                scope.endDateFilter = {
                    property: 'endDate',
                    minDate: null,
                    maxDate: null,
                    startDate: null,
                    endDate: null,
                    clauseBuilder: null
                };
                scope.descriptionFilter = {
                    property: 'description',
                    items: [
                    ]
                };
                scope.perPage = angular.isDefined(scope.perPage) ? scope.perPage : 20;
                scope.currentPage = 1;

            }
        }
    }]);