Directives.directive("degrees", ['User', '$log', 'toastr', function (User, $log, toastr) {
    return {
        templateUrl: 'views/templates/panels/degrees.html',
        scope: {
            userId: '='
        },
        link: function (scope, element, attrs, ctrl) {
            scope.spin = true;            
            User.getDegrees({ id: scope.userId, $expand:'school' },
                function onSuccess(data) {

                    scope.degrees = data.value;
                    scope.spin = false;
                },
                function onError(error) {
                    toastr.error("Could not load the user's education.", 'Error', { extraData: { error: error } });
                    $log.error(error);
                })
        }
    }
}]);