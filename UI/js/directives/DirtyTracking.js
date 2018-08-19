Directives.directive('dirtyTracking', ['Dialog', '$location', function (Dialog, $location) {
    return {
        restrict: 'A',
        link: function ($scope, $element, $attrs) {
            function isDirty() {
                var formObj = $scope[$element.attr('name')];
                return formObj && formObj.$pristine === false;
            }

            function areYouSurePrompt() {
                if (isDirty()) {
                    return 'You have unsaved changes. Are you sure you want to leave this page?';
                }
            }
            window.addEventListener('beforeunload', areYouSurePrompt);

            $element.bind("$destroy", function () {
                window.removeEventListener('beforeunload', areYouSurePrompt);
            });

            $scope.$on('$locationChangeStart', function (event, newUrl, oldUrl) {
                if (isDirty()) {
                    var originalEvent = event;

                    event.preventDefault();

                    Dialog.confirm('Are you sure you want to leave this page?',
                        'You have unsaved changes. Are you sure you want to leave this page?',
                        function onConfirm() {
                            var formObj = $scope[$element.attr('name')];
                            formObj.$setPristine();
                            $location.path(newUrl.split('#')[1]);
                        },
                        function onDeny() {
                            var formObj = $scope[$element.attr('name')];
                            angular.forEach(formObj.$error, function (field) {
                                angular.forEach(field, function (errorField) {
                                    errorField.$setTouched();
                                });
                            });
                            event.preventDefault();
                        })
                }
            });
        }
    };
}]);