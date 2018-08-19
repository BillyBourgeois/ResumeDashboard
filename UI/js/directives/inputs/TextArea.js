'use strict';

Directives.directive('textArea', function () {
    return {
        restrict: 'E',
        require: '^form',
        scope: {
            ngModel: '=',
            name: '@',
            ngDisabled: '=?',
            ngMaxlength: '=?',
            ngMinlength: '=?',
            ngRequired: '=?',
            label: '@?',
            placeholder: '@?',
            width: '@?',
            uppercase: '@?',
            alphaOnly: '@?',
            rows: '=?'
        },
        templateUrl: 'views/templates/text-area.html',
        link: function (scope, elem, attrs, formCtrl) {
            scope.disabled = scope.disabled != undefined ? scope.disabled : false;
            scope.ngMaxlength = scope.ngMaxlength != undefined ? scope.ngMaxlength : null;
            scope.ngMinlength = scope.ngMinlength != undefined ? scope.ngMinlength : null;
            scope.ngRequired = scope.ngRequired != undefined ? scope.ngRequired : false;
            scope.ngDisabled = scope.ngDisabled != undefined ? scope.ngDisabled : false;
            scope.label = scope.label != undefined ? scope.label : '';
            scope.placeholder = scope.placeholder != undefined ? scope.placeholder : scope.label;
            scope.width = scope.width != undefined ? scope.width : 'lg';
            scope.input = formCtrl[scope.name];
            scope.uppercase = scope.uppercase != undefined ? scope.uppercase : false;
            scope.alphaOnly = scope.alphaOnly != undefined ? scope.alphaOnly : false;
            scope.rows = scope.rows != undefined ? scope.rows : 5;
            scope.getUppercase = function () {
                return (scope.uppercase == 'true');                
            }

            scope.input.$parsers.push(function (inputValue) {
                if (scope.alphaOnly) {
                   if (inputValue == undefined) return ''
                   var transformedInput = inputValue.replace(/[^a-zA-Z]/, '').replace(/\s/g, "");;
                    if (transformedInput != inputValue) {
                        scope.input.$setViewValue(transformedInput);
                        scope.input.$render();
                    }
                    return transformedInput;
                }
                else {
                    return inputValue;
                }
            });
        }
    };
});