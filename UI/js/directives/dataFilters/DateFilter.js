DataFilters.directive("dateFilter",
    function () {
        return {
            restrict: 'E',
            transclude: false,
            templateUrl: 'views/templates/dataFilters/filter.html',
            scope: {
                filter: '=',
                onClose: '=?',
                onOpen: '=?'
            },
            link: function (scope, element, attrs) {
                element.bind('click',
                    function (e) {
                        e.stopPropagation();
                        $('body').click();
                    });

                scope.popupTemplateUrl = 'views/templates/dataFilters/date-filter-popup.html';
                scope.close = function close() {
                    scope.isOpen = false;
                };
                scope.selectHidden = function () {
                    var hidden = $('body').find('.hiddenDateFilterInput')
                    hidden.focus();
                    scope.setDirty()
                };
                scope.dirty = false;
                scope.setDirty = function setDirty() {
                    scope.dirty = true;
                };
                scope.filtered = function filtered() {
                    if (scope.filter != undefined && scope.filter != null &&
                        (scope.filter.startDate != null || scope.filter.endDate != null)) {
                        return true;
                    } else {
                        return false;
                    }
                };
                scope.buildClause = function buildClause() {
                    var andBuilder = new ODataFilterBuilder('and');
                    if (scope.filtered) {
                        if (scope.filter.startDate != null) {
                            scope.filter.startDate.setHours(0, 0, 0, 0);
                            andBuilder.ge(scope.filter.property, scope.filter.startDate.toTimeOffsetString(), false);
                        }
                        if (scope.filter.endDate != null) {
                            scope.filter.endDate.setHours(23, 59, 59, 999);
                            andBuilder.le(scope.filter.property, scope.filter.endDate.toTimeOffsetString(), false);
                        }
                    }
                    scope.filter.clauseBuilder = andBuilder;
                };
                scope.isOpen = false;
                scope.$watch(
                    function () {
                        return scope.isOpen;
                    },
                    function (newVal, oldVal) {
                        if (newVal != oldVal) {
                            if (newVal == true) {
                                if (scope.onOpen != undefined) {
                                    scope.onOpen();
                                }
                            }
                            else {
                                scope.buildClause();
                                if (scope.onClose != undefined) {
                                    scope.onClose(scope.dirty);
                                    scope.dirty = false;
                                }
                            }
                        }
                    }
                );  // end $watch
            }   // end link function
        }    // end return
    }   // end function
);  // end directive


