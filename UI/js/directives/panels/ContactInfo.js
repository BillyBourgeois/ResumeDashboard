Directives.directive("contactInfo", ['User', '$log', 'toastr', function (User, $log, toastr) {
    return {
        templateUrl: 'views/templates/panels/contact-info.html',
        scope: {
            userId: '='
        },
        link: function (scope, element, attrs, ctrl) {
            scope.spin = true;
            User.get({ id: scope.userId, $expand: 'phoneNumbers, addresses' },
                function onSuccess(data) {
                    scope.user = data;
                    scope.spin = false;
                },
                function onError(error) {
                    toastr.error("Could not load the user's contact information.", 'Error', { extraData: { error: error } });
                    $log.error(error);
                })
        }
    }
}]);