DataFilters.directive("containsFilter",
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
                        $('body').click();
                    }
                );
                scope.close = function close() {
                    scope.isOpen = false;
                }
                scope.popupTemplateUrl = 'views/templates/dataFilters/contains-filter-popup.html';
                if (scope.filter == undefined) {
                    scope.filter = {
                        property: '',
                        items: []
                    };
                }
                scope.filter.filtered = false;
                if (scope.filter.items == undefined) {
                    scope.filter.items = [""];
                }
                if (scope.filter.items.length == 0 || scope.filter.items[scope.filter.items.length - 1] != "") {
                    scope.filter.items.push("");
                }
                scope.removeItem = function (index) {
                    scope.filter.items.splice(index, 1);
                    scope.setDirty();
                }
                scope.filtered = function () {
                    return scope.filter.items.some(function (e) {
                        scope.filter.filtered = e;
                        return e;
                    });
                };
                scope.buildClause = function buildClause() {
                    var orBuilder = new ODataFilterBuilder('or');
                    if (scope.filtered) {
                        angular.forEach(scope.filter.items, function (text, i) {
                            if (text != '') {
                                text = escapeHtml(text)
                                orBuilder.contains(scope.filter.property, text);
                            }
                        });
                    }
                    scope.filter.clauseBuilder = orBuilder;
                };
                scope.addBlankItem = function addBlankItem() {
                    if (scope.filter.items[scope.filter.items.length - 1] != "") {
                        scope.filter.items.push("");
                    }
                }
                scope.dirty = false;
                scope.setDirty = function setDirty() {
                    scope.dirty = true;
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
                ); // end $watch
            }   // end link function
        }    // end return
    }   // end function
);  // end directive