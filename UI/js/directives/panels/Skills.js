Directives.directive("skills", ['User', '$log', 'toastr', function (User, $log, toastr) {
    return {
        templateUrl: 'views/templates/panels/skills.html',
        scope: {
            userId: '='
        },
        link: function (scope, element, attrs, ctrl) {
            scope.spin = true;
            scope.graphType = 'donut';
            User.getSkills({ id: scope.userId },
                function onSuccess(data) {
                    scope.skills = data.value;
                    scope.spin = false;
                },
                function onError(error) {
                    toastr.error("Could not load the user's skills.", 'Error', { extraData: { error: error } });
                    $log.error(error);
                })
        }
    }
}]);