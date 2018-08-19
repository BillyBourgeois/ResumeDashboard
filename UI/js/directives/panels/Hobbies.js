Directives.directive("hobbies", ['User', '$log', 'toastr', function (User, $log, toastr) {
    return {
        templateUrl: 'views/templates/panels/hobbies.html',
        scope: {
            userId: '='
        },
        link: function (scope, element, attrs, ctrl) {
            scope.spin = true;
            scope.graphType = 'bar';
            User.getHobbies({ id: scope.userId },
                function onSuccess(data) {
                    scope.hobbies = data.value;
                    scope.spin = false;
                },
                function onError(error) {
                    toastr.error("Could not load the user's hobbies.", 'Error', { extraData: { error: error } });
                    $log.error(error);
                })
        }
    }
}]);