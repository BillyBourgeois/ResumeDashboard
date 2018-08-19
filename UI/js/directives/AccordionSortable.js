
//angular.module('ui.bootstrap.accordion.custom', ['ui.bootstrap'])
angular.module('ui.bootstrap.accordion.sortable', ['ui.bootstrap'])
.constant('uibAccordionSortableConfig', {
    closeOthers: false
})

.controller('UibAccordionControllerSortable', ['$scope', '$attrs', 'uibAccordionSortableConfig', function ($scope, $attrs, accordionConfig) {
    // This array keeps track of the accordion groups
    this.groups = [];
    this.columns = new Array();
    this.base = {};

    // Ensure that all the groups in this accordion are closed, unless close-others explicitly says not to
    this.closeOthers = function (openGroup) {
        var closeOthers = angular.isDefined($attrs.closeOthers) ?
          $scope.$eval($attrs.closeOthers) : accordionConfig.closeOthers;
        if (closeOthers) {
            angular.forEach(this.groups, function (group) {
                if (group !== openGroup) {
                    group.isOpen = false;
                }
            });
        }
    };

    // This is called from the accordion-group directive to add itself to the accordion
    this.addGroup = function (groupScope) {
        var that = this;

        this.groups.push(groupScope);

        groupScope.$on('$destroy', function (event) {
            that.removeGroup(groupScope);
        });
    };

    this.refreshColumns = function () {

    };

    this.addGroupToColumn = function (groupScope, columnIndex, element) {
        var that = this;
        var $columns = $(this.base).find('.columns');
        $($columns[columnIndex]).first('[position]').prepend(element);
        //  this.columns[columnIndex].push(groupScope);


    };
    this.moveUp = function (groupScope, columnIndex, element) {
        var previous = $(element).prev()
        previous.before($(element));
    };
    this.moveDown = function (groupScope, columnIndex, element) {
        var next = $(element).next()
        next.after($(element));
    };
    this.moveLeft = function (groupScope, columnIndex, element) {
        var column = $(element).closest('.column')
        var prevCol = column.prev();
        prevCol.append($(element));
    };
    this.moveRight = function (groupScope, columnIndex, element) {
        var column = $(element).closest('.column')
        var nextCol = column.next();
        nextCol.append($(element));
    };
    this.refreshColumns = function () {
    };
    // This is called from the accordion-group directive when to remove itself
    this.removeGroup = function (group) {
        var index = this.groups.indexOf(group);
        if (index !== -1) {
            this.groups.splice(index, 1);
        }
    };
}])

// The accordion directive simply sets up the directive controller
// and adds an accordion CSS class to itself element.
.directive('uibAccordionSortable', ['$timeout', function ($timeout) {
    return {
        controller: 'UibAccordionControllerSortable',
        controllerAs: 'accordionSortable',
        transclude: true,
        replace: true,
        scope: {
            columns: '=',
        },
        templateUrl: function (element, attrs) {
            return attrs.templateUrl || 'views/templates/accordion-sortable.html';
        },
        link: function (scope, element, attr, ctrl, transclude) {

            scope.accordionSortable.columns = scope.columns;
            scope.accordionSortable.base = element;
            scope.getNumber = function (num) {
                return new Array(num);
            }

            scope.totalBeforeCurrent = function (index) {
                var total = 0;
                for (i = 0; i < index; i++) {
                    if (angular.isDefined(scope.columns[i])) {
                        total += scope.columns[i];
                    }
                }
                return total;
            }

            scope.temp;
            scope.ops = [
                    { name: '1', array: [12] },
                    { name: '2', array: [6, 6] },
                    { name: '3', array: [3, 6, 3] },
                    { name: '4', array: [3, 3, 3, 3] }
            ];

            scope.$watch('columns', function (value) {
                var temp = 1;
            });
            scope.checkButton = function () {
                var temp = scope.columns;
            };

            //scope.columns = angular.isDefined(scope.columns) && angular.isArray(scope.columns) ? scope.columns : scope.ops[3];
            //scope.columns = 1;

            scope.opsNumber = [1, 2, 3, 4];
            scope.refreshview = function refreshview(columnsArray) {
                transclude(scope.$parent, function (transcludedElements, scope) {
                    var sortedcolumns = createArray(columnsArray.length, 0);
                    //remove columns
                    $('.column').remove();
                    //build columns
                    angular.forEach(columnsArray, function (item) {
                        if (item != null) {
                            var columns = $(element).append('<div class="column col-sm-' + item + '" role="tablist"></div>')
                        }
                    });
                    var columns = $(element).find('.column');
                    //sort elements
                    angular.forEach(transcludedElements, function (transcludedElement) {
                        var columnNumber = $(transcludedElement).attr('column');
                        var position = $(transcludedElement).attr('position');
                        var hide = $(transcludedElement).attr('position');
                        //make sure that the columns are defined
                        if (angular.isDefined(columnNumber)) {
                            var column = columns[columnNumber];
                            if (column == undefined) {
                                $(transcludedElement).attr('column', columns.length - 1);
                                sortedcolumns[columns.length - 1].push(transcludedElement);
                            }
                            else {
                                sortedcolumns[columnNumber].splice(position, 0, transcludedElement);
                            }
                        };
                    });
                    //add to the column elements
                    angular.forEach(sortedcolumns, function (col, i) {
                        $(columns[i]).append(col);
                    });
                });
            };

            scope.accordionSortable.refreshColumns = scope.refreshview;
            scope.$watch('columns', function (newVal, oldVal) {
                scope.refreshview(newVal);



            }, true);
        }

    };
}])



// The accordion-group directive indicates a block of html that will expand and collapse in an accordion
.directive('uibAccordionGroupSortable', ['$location', function ($location, StatusLookups) {
    return {
        require: '^uibAccordionSortable',         // We need this directive to be inside an accordion
        transclude: true,              // It transcludes the contents of the directive into the template
        replace: true,                // The element containing the directive will be replaced with the template
        templateUrl: function (element, attrs) {
            return attrs.templateUrl || '/app/views/templates/accordion-group-sortable.html';
        },
        scope: {
            heading: '@',               // Interpolate the heading attribute onto this scope
            statusId: '=?',
            vertex: '=?',
            assignCount: '@',
            panelClass: '@?',           // Ditto with panelClass
            isOpen: '=?',
            isDisabled: '=?',
            hash: '@?',
            model: '=',
            onOpen: '=?',
            settings: '=?',
            column: '=',
            position: '='

        },
        controller: function () {
            this.setHeading = function (element) {
                this.heading = element;
            };
        },
        link: function (scope, element, attrs, accordionCtrl) {
            if (accordionCtrl) {
                //  accordionCtrl.addGroup(scope);
                accordionCtrl.addGroupToColumn(scope, scope.column, element);
                scope.openClass = attrs.openClass || 'panel-open';
                scope.panelClass = attrs.panelClass || 'panel-default';
                //scope.$watch('isOpen', function (value) {
                //    element.toggleClass(scope.openClass, !!value);
                //    if (value) {
                //        accordionCtrl.closeOthers(scope);
                //    }
                //});
                scope.moveUp = function moveUp() {
                    accordionCtrl.moveUp(scope, scope.column, element);
                };
                scope.moveDown = function moveDown() {
                    accordionCtrl.moveDown(scope, scope.column, element);
                };
                scope.moveLeft = function moveLeft() {
                    accordionCtrl.moveLeft(scope, scope.column, element);
                };
                scope.moveRight = function moveRight() {
                    accordionCtrl.moveRight(scope, scope.column, element);
                };
                scope.$watch('position', function (newVal, oldVal) {
                    accordionCtrl;
                });
                scope.toggleOpen = function ($event) {
                    if (!scope.isDisabled) {
                        if (!$event || $event.which === 32) {
                            scope.isOpen = !scope.isOpen;
                            if (scope.hash != undefined) {
                                $location.hash(scope.hash.toLowerCase());
                            }
                            if (scope.isOpen) {
                                if (angular.isDefined(scope.onOpen)) {
                                    scope.onOpen();
                                }
                            }
                        }
                    }
                };

                scope.popupTemplateUrl = "settingPopover.html";
                scope.leaveOpen = function leaveOpen($event) {
                    if (!scope.isDisabled) {
                        if ($event.which === 1 || $event.which === 32) {
                            $event.preventDefault();
                            $event.stopPropagation();
                        }
                    }

                };
                var id = 'accordiongroupsortable-' + scope.$id + '-' + Math.floor(Math.random() * 10000);
                scope.headingId = id + '-tab';
                scope.panelId = id + '-panel';
            }
        }
    };
}])

// Use in the accordion-group template to indicate where you want the heading to be transcluded
// You must provide the property on the accordion-group controller that will hold the transcluded element
.directive('uibAccordionTranscludeSortable', function () {
    return {
        require: '^uibAccordionGroupSortable',
        link: function (scope, element, attrs, controller) {
            scope.$watch(function () { return controller[attrs.uibAccordionTranscludeSortable]; }, function (heading) {
                if (heading) {
                    var elem = angular.element(element[0].querySelector('[uib-accordion-header]'));
                    elem.html('');
                    elem.append(heading);
                }
            });
        }
    };
});

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while (i--) arr[length - 1 - i] = createArray.apply(this, args);
    }

    return arr;
}

app.filter('range', function () {
    return function (input, min, max) {
        min = parseInt(min); //Make string input int
        max = parseInt(max);
        for (var i = min; i <= max; i++)
            input.push(i);
        return input;
    };
});