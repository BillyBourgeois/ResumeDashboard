'use strict';

Directives.directive('datePicker', function () {
    return {
        restrict: 'E',
        require: ['^ngModel', '?ngDisabled'],
        scope: {
            ngModel: '=',
            ngDisabled: '=',
            minDate: '=',
            maxDate: '=',
            showWeeks: '=?',
            size: '=?',
            onClose: '=?'
        },
        templateUrl: 'views/templates/date-picker.html',
        link: function (scope, elem, attrs) {

            function disabled(data, mode) {
                var date = data.date,
                  mode = data.mode;
                return mode === 'day' && false;
            }

            scope.dateOptions = {
                dateDisabled: disabled,

                maxDate: scope.maxDate != null ? scope.maxDate : new Date(2050, 12, 31),
                minDate: scope.minDate != null ? scope.minDate : new Date(),
                startingDay: 0,                
                showWeeks: scope.showWeeks != undefined ? showWeeks : false
            };

            switch(scope.size)
            {
                case 'sm':
                    scope.inputClass = 'input-sm';
                    scope.btnClass = 'btn-sm';
                    break;
                case 'md':
                    scope.inputClass = '';
                    scope.btnClass = '';
                    break;
                case 'lg':
                    scope.inputClass = 'input-lg';
                    scope.btnClass = 'btn-lg';
                    break;
                default:
                    scope.inputClass = '';
                    scope.btnClass = '';
                    break;
            }

            scope.show = false;
            scope.open = function ($event) {
                scope.dateOptions.minDate = scope.minDate;
                scope.dateOptions.maxDate = scope.maxDate;
                scope.show = !scope.show;
            };
            scope.$watch('show', function (val, preVal)
            {
                if(!val && preVal)
                {
                    if (scope.onClose != undefined) {
                        scope.onClose();
                    }
                }
            });
        }
    };
});