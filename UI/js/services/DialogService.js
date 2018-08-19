var DialogService = angular.module('Dialog', []);

DialogService.factory('Dialog', ['$uibModal',
    function ($uibModal) {
        var alert = function (title, message, onConfirm) {
            var alertInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/templates/dialog-alert.html',
                controller: 'AlertCtrl',
                controllerAs: '$ctrl',
                size: 'sm',
                resolve: {
                    message: function () {
                        return message;
                    },
                    title: function () {
                        return title;
                    }
                }
            });
            alertInstance.result.then(function () {
                if(onConfirm !== undefined)
                {
                    onConfirm();
                }
            });
        };

        var confirm = function (title, message, onConfirm, onDeny) {
            var confirmInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/templates/dialog-confirm.html',
                controller: 'ConfirmCtrl',
                controllerAs: '$ctrl',
                size: 'sm',
                resolve: {
                    message: function () {
                        return message;
                    },
                    title: function () {
                        return title;
                    }
                }
            });
            confirmInstance.result.then(function (confirm) {
                if (confirm) {
                    if (onConfirm !== undefined) {
                        onConfirm();
                    }
                }
                else {
                    if (onDeny !== undefined) {
                        onDeny();
                    }                    
                }
            });
        };
        var input = function (title, message, maxlength, minlength, required,placeholder, onContinue, onCancel, defaultValue) {
            var confirmInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/templates/dialog-input.html',
                controller: 'InputCtrl',
                controllerAs: '$ctrl',
                size: 'sm',
                resolve: {
                    message: function () {
                        return message;
                    },
                    title: function () {
                        return title;
                    },
                    maxlength: function () {
                        return maxlength;
                    },
                    minlength: function () {
                        return minlength;
                    },
                    required: function () {
                        return required;
                    },
                    placeholder: function () {
                        return placeholder;
                    },
                    defaultValue: function () {
                        if (angular.isDefined(defaultValue)) {
                            return defaultValue;
                        }
                        else {
                            return '';
                        }
                    }
                }
            });
            confirmInstance.result.then(function (userInput) {
                if (userInput != null) {
                    onContinue(userInput);
                }
                else {
                    onCancel();
                }
            });
        };

        return {
            alert: alert,
            confirm: confirm,
            input: input
        };
    }]);


DialogService.controller('AlertCtrl', function ($uibModalInstance, title, message) {
    var $ctrl = this;
    $ctrl.title = title;
    $ctrl.message = message;
    $ctrl.ok = function () {
        $uibModalInstance.close();
    };
});

DialogService.controller('ConfirmCtrl', function ($uibModalInstance, title, message) {
    var $ctrl = this;
    $ctrl.title = title;
    $ctrl.message = message;
    $ctrl.yes = function () {
        $uibModalInstance.close(true);
    };
    $ctrl.no = function () {
        $uibModalInstance.close(false);
    };
});

DialogService.controller('InputCtrl', function ($uibModalInstance, title, message, maxlength, minlength, required, placeholder, defaultValue) {
    var $ctrl = this;
    $ctrl.title = title;
    $ctrl.message = message;
    $ctrl.maxlength = maxlength;
    $ctrl.minlength = minlength;
    $ctrl.required = required;
    $ctrl.placeholder = placeholder;
    $ctrl.inputText = defaultValue;
    $ctrl.continue = function () {
        $uibModalInstance.close($ctrl.inputText);
    };
    $ctrl.cancel = function () {
        $uibModalInstance.close(null);
    };
});