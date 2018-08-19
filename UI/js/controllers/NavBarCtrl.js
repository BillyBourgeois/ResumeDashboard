'use strict';

Controllers.controller('NavBarCtrl', ['$scope', '$route', 'toastr', '$interval', 'Hub', 'User', '$log', 'Dialog',
    function ($scope, $route, toastr, $interval, Hub, User, $log, Dialog) {

        $scope.heartbeat = false;

        $interval(function () {
            if (Hub.connected()) {
                $scope.heartbeat = !$scope.heartbeat;
            }
        }, 1000);

        $scope.isActive = function (path) {
            if ($route.current && $route.current.regexp) {
                var inRoute = $route.current.originalPath.toLowerCase().indexOf(path.toLowerCase()) > -1;
                return inRoute;
            }
            return false;
        };

        User.query({},
            function onSuccess(data) {
                $scope.users = data.value;
                var error = {}
            },
            function onError(error) {
                toastr.error("Could not load the resumes.", 'Error', { extraData: { error: error } });
                $log.error(error);
            });

        $scope.loadingClicked = function loadingClicked() {
            Dialog.alert('Please Wait', 'The list of resumés is still loading.');
        };

        $scope.infoClicked = function loadingClicked() {
            Dialog.alert('Application Information', 'This is a sample application. <div>Author: Billy Bourgeois</div><div>  Technologies: Web API, Odata, toastr, Entity Frameworks Code First, SignalR, Angular, Jquery, Bootstrap, Owin, .Net.</div>');
        };
    }]);