Controllers.directive("iconSelect",
    function () {
        return {
            restrict: 'E',
            transclude: true,
            require: '^form',
            templateUrl: 'views/templates/icon-select.html',
            scope: {
                ngModel: '=',
                ngDisabled: '=?'
            },
            link: function (scope, element, attrs, formCtrl, transclude) {
               
                scope.popupTemplateUrl = 'views/templates/icon-select-popup.html';
                scope.setIcon = function setIcon(icon) {
                    if (icon != scope.ngModel) {
                        scope.ngModel = icon;
                        scope.isOpen = false;
                    }
                };

                scope.isChecked = function isChecked(icon) {
                    var checked = angular.isDefined(scope.ngModel) && icon == scope.ngModel
                    return checked;
                };

                scope.ngDisabled = angular.isDefined(scope.ngDisabled) ? scope.ngDisabled : false;

                scope.options = [
                    'triangle',
                    'diamond',
                    'square',
                    'circle',
                    'boy',
                    'girl',
                    'people',
                    'people-alt',
                    'security',
                    'archive',
                    'edit',
                    'phone',
                    'camera',
                    'print',
                    'gear',
                    'database',
                    'chart',
                    'chart-alt',
                    'finance',
                    'shipping',
                    'receiving',
                    'mail',
                    'email',
                    'calculate',
                    'computer',
                    'cash-register'
                    
                ];
                scope.searchTerm = '';

                scope.toggleOpen = function toggleOpen() {
                    scope.isOpen = !scope.isOpen;
                    if (scope.isOpen)
                    {
                        
                    }
                    else {
                        element.parent().focus();

                    }
                };

                element.bind('click',
                   function (e) {
                       e.stopPropagation();
                   });

                scope.$watch('ngModel', function (newVal, oldVal) {
                    if (newVal != oldVal && newVal != null) {
                        formCtrl.$setDirty();
                        var svgIcon = element.find('#svgIcon');
                        svgIcon.replaceWith('<svg class="icon-sm" id="svgIcon" style="line-height: 1;"><use xlink:href="Content/svgIcons/icons.svg#' + newVal + '"/></svg>');
                    }
                });

                scope.buttonsKeyDown = function buttonsKeyDown(event, option) {
                    var keyCode = event.keyCode;
                    var $radioButtons = $('input[type="radio"]');

                    switch (event.keyCode) {
                        case 27:
                            scope.toggleOpen();
                            break;
                        case 13: // enter
                            scope.ngModel = option;
                            scope.toggleOpen();
                            break;
                        case 39: // enter
                        case 9: // esc
                            var index = $radioButtons.index($(event.target));
                            if ($radioButtons.length > index + 1) {
                                $radioButtons[index + 1].focus();
                            }
                            else {
                                $radioButtons.first().focus();
                            }
                            break;
                        case 37://left arrow
                            var index = $radioButtons.index($(event.target));
                            if (index > 0) {
                                $radioButtons[index - 1].focus();
                            }
                            else {
                                $radioButtons.last().focus();
                            }
                            break;
                        case 38://up arrow
                            var index = $radioButtons.index($(event.target));
                            var targetIndes = index - 3
                            if (targetIndes > 0) {
                                $radioButtons[targetIndes].focus();
                            }
                            else {
                                $radioButtons.last().focus();
                            }
                            break;
                        case 40: // down arrow
                            var index = $radioButtons.index($(event.target));
                            var targetIndes = index + 3
                            if (targetIndes < $radioButtons.length) {
                                $radioButtons[targetIndes].focus();
                            }
                            else {
                                $radioButtons.first().focus();
                            }
                            break;
                    };
                    event.preventDefault();
                    event.stopPropagation()
                };
                scope.textInputkKeyDown = function doStuff(event) {
                    var $radioButtons = $('input[type="radio"]');
                    switch (event.keyCode) {
                        case 27:
                            scope.toggleOpen();
                            break;
                        case 9: //enter
                        case 37: //left arrow
                        case 38: //up arrow
                        case 39: //right arrow
                        case 40: // down arrow
                            if ($('input[type="radio"][checked]').length > 0) {
                                $('input[type="radio"][checked]').first().focus();
                            }
                            else {
                                $radioButtons.first().focus();
                            }
                            event.preventDefault();
                            break;
                    };

                };

               
            }
        }
    });