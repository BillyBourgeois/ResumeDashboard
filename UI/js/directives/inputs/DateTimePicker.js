"use strict";

Directives.directive('dateTimePicker', function () {
    return {
        restrict: 'E',
        require: ['^ngModel', '?ngDisabled'],
        scope: {
            ngModel: '=',
            ngDisabled: '=',
            minDate: '=?',
            maxDate: '=?',
            showWeeks: '=?',
            width: '@?',
            size: '@?',
            autoOpenTime: '=?',
            name: '@?',
            hideClear: '=?',

        },
        templateUrl: 'views/templates/date-time-picker.html',
        compile: function (scope, elem, attrs) {
            return {
                pre: function (scope, elem, attrs) {
                    scope.$parent.buttonBar = scope.buttonBar = {
                        show: true,
                        now: {
                            show: true,
                            text: 'Now'
                        },
                        today: {
                            show: true,
                            text: 'Today'
                        },
                        clear: {
                            show: angular.isDefined(scope.hideClear) ? !scope.hideClear : true,
                            text: 'Clear'
                        },
                        date: {
                            show: true,
                            text: 'Date'
                        },
                        time: {
                            show: true,
                            text: 'Time'
                        },
                        close: {
                            show: true,
                            text: 'Close'
                        }
                    };
                    scope.autoOpenTime = angular.isDefined(scope.autoOpenTime) ? scope.autoOpenTime : false;
                    scope.name = angular.isDefined(scope.name) ? scope.autoOpenTime : '';

                    function disabled(data, mode) {
                        var date = data.date,
                        mode = data.mode;
                        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
                    }

                    scope.dateOptions = {
                        dateDisabled: disabled,
                        formatYear: 'yyyy',
                        maxDate: scope.maxDate !== null ? new Date(scope.maxDate) : new Date(2050, 12, 31),
                        minDate: scope.minDate !== null ? new Date(scope.minDate) : new Date(),
                        startingDay: 0,
                        showWeeks: scope.showWeeks !== undefined ? scope.showWeeks : false
                    };
                    scope.show = false;
                    scope.open = function open($event) {
                        scope.$parent.buttonBar.clear.show = angular.isDefined(scope.hideClear) ? !scope.hideClear : true;
                        scope.dateOptions.minDate = scope.minDate;
                        scope.dateOptions.maxDate = scope.maxDate;
                        scope.show = true;
                    };
                    scope.toggle = function toggle($event) {
                        scope.dateOptions.minDate = scope.minDate;
                        scope.dateOptions.maxDate = scope.maxDate;
                        scope.show = !scope.show;
                    };

                    switch (scope.size) {
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
                },
                post: angular.noop
            }
        },
        //link: function (scope, elem, attrs) {
        //    scope.xready = false;
        //    scope.$parent.buttonBar = scope.buttonBar = {
        //        show: true,
        //        now: {
        //            show: true,
        //            text: 'Now'
        //        },
        //        today: {
        //            show: true,
        //            text: 'Today'
        //        },
        //        clear: {
        //            show: angular.isDefined(scope.hideClear) ? !scope.hideClear : true,
        //            text: 'Clear'
        //        },
        //        date: {
        //            show: true,
        //            text: 'Date'
        //        },
        //        time: {
        //            show: true,
        //            text: 'Time'
        //        },
        //        close: {
        //            show: true,
        //            text: 'Close'
        //        }
        //    };
        //    scope.autoOpenTime = angular.isDefined(scope.autoOpenTime) ? scope.autoOpenTime : false;
        //    scope.name = angular.isDefined(scope.name) ? scope.autoOpenTime : '';

        //    function disabled(data, mode) {
        //        var date = data.date,
        //        mode = data.mode;
        //        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        //    }

        //    scope.dateOptions = {
        //        dateDisabled: disabled,
        //        formatYear: 'yyyy',
        //        maxDate: scope.maxDate !== null ? new Date(scope.maxDate) : new Date(2050, 12, 31),
        //        minDate: scope.minDate !== null ? new Date(scope.minDate) : new Date(),
        //        startingDay: 0,
        //        showWeeks: scope.showWeeks !== undefined ? scope.showWeeks : false
        //    };
        //    scope.show = false;
        //    scope.open = function open($event) {
        //        scope.dateOptions.minDate = scope.minDate;
        //        scope.dateOptions.maxDate = scope.maxDate;
        //        scope.show = true;
        //    };
        //    scope.toggle = function toggle($event) {
        //        scope.dateOptions.minDate = scope.minDate;
        //        scope.dateOptions.maxDate = scope.maxDate;
        //        scope.show = !scope.show;
        //    };

        //    switch (scope.size) {
        //        case 'sm':
        //            scope.inputClass = 'input-sm';
        //            scope.btnClass = 'btn-sm';
        //            break;
        //        case 'md':
        //            scope.inputClass = '';
        //            scope.btnClass = '';
        //            break;
        //        case 'lg':
        //            scope.inputClass = 'input-lg';
        //            scope.btnClass = 'btn-lg';
        //            break;
        //        default:
        //            scope.inputClass = '';
        //            scope.btnClass = '';
        //            break;
        //    }

        //    scope.xready = true;
        //}
    };
});