DataFilters.directive("selectFilter",
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
                    }
                );
                scope.close = function close() {
                    scope.isOpen = false;
                };
                scope.selectHidden = function () {
                    var hidden = $('body').find('.hiddenSelectFilterInput')
                    hidden.focus();
                    scope.setDirty();
                };
                scope.popupTemplateUrl = 'views/templates/dataFilters/select-filter-popup.html';
                if (scope.filter === undefined) {
                    scope.filter = {
                        property: '',
                        items: []
                    }
                }
                scope.filter.filtered = false;
                scope.onToggle = function (item) {
                    item.selected = !item.selected;
                    scope.selectHidden();
                };
                scope.onSelectAllToggle = function (item) {
                    var selected = scope.filtered();
                    scope.filter.items.forEach(function (item) {
                        item.selected = selected;
                    });
                    scope.selectHidden();
                };
                scope.filtered = function () {
                    return scope.filter.items.some(function (e) {
                        scope.filter.filtered = !e.selected;
                        return !e.selected;
                    });
                };

                scope.buildClause = function () {
                    var orBuilder = new ODataFilterBuilder('or');
                    if (scope.filtered) {

                        var selectedItems = scope.filter.items.filter(function (item) {
                            return item.selected
                        });
                        //only filter removes all items
                        if (selectedItems.length > 0) {
                            //if filter is applied
                            if (selectedItems.length !== scope.filter.items.length) {
                                //if a manual filter
                                if (scope.filter.property === null) {
                                    angular.forEach(selectedItems, function (obj, i) {
                                        orBuilder.or(obj.value);
                                    });
                                }
                                else { //if not a manual filter
                                    //if there are more selected items than not selected items (used to reduce filter length)
                                    if (selectedItems.length <= scope.filter.items.length / 2) {
                                        angular.forEach(selectedItems, function (obj, i) {
                                            orBuilder.eq(scope.filter.property, obj.value, true)
                                        });
                                    }
                                    else {
                                        angular.forEach(scope.filter.items, function (obj, i) {
                                            if (!obj.selected) {
                                                orBuilder.ne(scope.filter.property, obj.value, true);
                                            }
                                        });
                                    }
                                }
                            }
                        }
                        else {
                            orBuilder.or('false');
                        }
                    }
                    scope.filter.clauseBuilder = orBuilder;
                };
                scope.filter.filtered = scope.filtered();
                scope.dirty = false;
                scope.setDirty = function close() {
                    scope.dirty = true;
                };
                scope.isOpen = false;
                scope.buildClause();
                scope.$watch(
                    function () {
                        return scope.isOpen;
                    },
                    function (newVal, oldVal) {
                        if (newVal !== oldVal) {
                            if (newVal === true) {
                                if (scope.onOpen !== undefined) {
                                    scope.onOpen();
                                }
                            } else {
                                scope.buildClause();
                                if (scope.onClose !== undefined) {
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