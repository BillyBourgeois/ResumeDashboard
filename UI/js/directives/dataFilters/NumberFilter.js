DataFilters.directive("numberFilter",
    function () {
        return {
            restrict: 'E',
            transclude: true,
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
                        $('body').click 
                    }
                );
                scope.popupTemplateUrl = 'views/templates/dataFilters/number-filter-popup.html';
                if (scope.filter == undefined) {
                    scope.filter = {
                        property: '',
                        range: ''
                    }
                }
                scope.filter.filtered = false;
                if (scope.filter.range == undefined) {
                    scope.filter.range = '';
                }

                scope.filtered = function filtered() {
                    return scope.filter.range != '';
                };
                scope.clear = function clear() {
                    
                    if(scope.filter.range != '')
                    {
                        scope.filter.range = '';
                        scope.dirty = true;
                    }
                }
                scope.buildClause = function buildClause() {
                    var orBuilder = new ODataFilterBuilder('or');
                    if (scope.filtered) {
                        var numbers = getNumbers(scope.filter.range);
                        angular.forEach(numbers, function (number, i) {
                            if (number != '') {                                
                                orBuilder.eq(scope.filter.property, number);
                            }
                        });
                    }
                    scope.filter.clauseBuilder = orBuilder;
                };

                scope.isOpen = false;
                scope.close = function close() {
                    scope.isOpen = false;
                };
                scope.dirty = false;
                scope.setDirty = function setDirty() {
                    scope.dirty = true;
                };
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
                ); // end $watch
            }   // end link function
        }    // end return
    }   // end function
);  // end directive
