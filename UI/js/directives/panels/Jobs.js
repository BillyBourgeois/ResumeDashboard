Directives.directive("jobs", ['User', '$log', 'toastr', function (User, $log, toastr) {
    return {
        templateUrl: 'views/templates/panels/jobs.html',
        scope: {
            userId: '='
        },
        link: function (scope, element, attrs, ctrl) {
            scope.spin = true;            
            User.getJobs({ id: scope.userId, $expand:'company' },
                function onSuccess(data) {
                    scope.jobs = data.value;
                    scope.spin = false;
                },
                function onError(error) {
                    toastr.error("Could not load the user's skills.", 'Error', { extraData: { error: error } });
                    $log.error(error);
                })
        }
    }
}]);