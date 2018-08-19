'use strict';
Graphing.directive('combinedGraph', ['$timeout', function ($timeout) {
    return {
        restrict: 'E',
        require: '^ngModel',
        scope: {
            ngModel: '=',
            type: '=',
            queryUrl: '@?'
        },
        templateUrl: 'views/templates/combined-graph.html',
        link: function (scope, elem, attrs) {
            scope.spin = true;
            $timeout(function () {
                scope.spin = false;
            }, 500);
            scope.type = scope.type === 'bar' || scope.type === 'list' ? scope.type : 'donut';

            scope.notSpin = function () {
                return scope.delayed(!scope.spin);
            }
            scope.delayed = function delayed(boolean)
            {
                $timeout(function () {
                    return boolean;
                }, 500);
            }
            
            scope.listData = scope.ngModel;

            scope.getGraphData = function getGraphData(rawData) {
                var processedData = new Array();
                angular.forEach(rawData, function (data) {
                    var graphItem = new GraphItem(data.name, data.years, 'years')
                    processedData.push(graphItem);                    
                });
                return processedData;
            };

            scope.graphData = scope.getGraphData(scope.ngModel);
        }
    };
}]);

