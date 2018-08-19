'use strict';

Controllers.controller('ErrorCtrl', ['$scope', '$routeParams',
function ($scope, $routeParams) {
    $scope.errorCode = $routeParams.code !== null ? $routeParams.code : null;
    $scope.errorPhrase = 'Error';
    switch ($scope.errorCode) {
        case '404':
            $scope.errorPhrase = 'The page you are looking for cannot be found.';
            break;
        case '403':
            $scope.errorPhrase = "You don't have permission to see this page.";
            break;
        case '500':
            $scope.errorPhrase = "We can't give you the page you are looking for.";
            break;
        default:
            $scope.errorCode = 'Error';
            $scope.errorPhrase = 'An Error occured.';
            break;
    }
}]);

