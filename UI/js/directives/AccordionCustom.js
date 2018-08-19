//angular.module('ui.bootstrap.accordion.custom', ['ui.bootstrap'])
angular.module('ui.bootstrap.accordion.custom', ['ui.bootstrap'])
.constant('uibAccordionCustomConfig', {
    closeOthers: true
})

.controller('UibAccordionControllerCustom', ['$scope', '$attrs', 'uibAccordionCustomConfig', function ($scope, $attrs, accordionConfig) {
    // This array keeps track of the accordion groups
    this.groups = [];

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
.directive('uibAccordionCustom', function () {
    return {
        controller: 'UibAccordionControllerCustom',
        controllerAs: 'accordionCustom',
        transclude: true,
        templateUrl: function (element, attrs) {
            return attrs.templateUrl || 'uib/template/accordion/accordion.html';
        }
    };
})



// The accordion-group directive indicates a block of html that will expand and collapse in an accordion
.directive('uibAccordionGroupCustom', ['$location',  function ($location) {
    return {
        require: '^uibAccordionCustom',         // We need this directive to be inside an accordion
        transclude: true,              // It transcludes the contents of the directive into the template
        replace: true,                // The element containing the directive will be replaced with the template
        templateUrl: function (element, attrs) {
            return attrs.templateUrl || '/app/views/templates/accordion-group.html';
        },
        scope: {
            heading: '@',               // Interpolate the heading attribute onto this scope            
            panelClass: '@?',           // Ditto with panelClass
            isOpen: '=?',
            isDisabled: '=?',
            hash: '@?',
            model: '=',
            onOpen: '=?'
        },
        controller: function () {
            this.setHeading = function (element) {
                this.heading = element;

            };
        },
        link: function (scope, element, attrs, accordionCtrl) {
            accordionCtrl.addGroup(scope);           
            scope.openClass = attrs.openClass || 'panel-open';
            scope.panelClass = attrs.panelClass || 'panel-default';
            scope.$watch('isOpen', function (value) {
                element.toggleClass(scope.openClass, !!value);
                if (value) {
                    accordionCtrl.closeOthers(scope);
                }
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
            var id = 'accordiongroupcustom-' + scope.$id + '-' + Math.floor(Math.random() * 10000);
            scope.headingId = id + '-tab';
            scope.panelId = id + '-panel';
        }
    };
}])

// Use in the accordion-group template to indicate where you want the heading to be transcluded
// You must provide the property on the accordion-group controller that will hold the transcluded element
.directive('uibAccordionTranscludeCustom', function () {
    return {
        require: '^uibAccordionGroupCustom',
        link: function (scope, element, attrs, controller) {
            scope.$watch(function () { return controller[attrs.uibAccordionTranscludeCustom]; }, function (heading) {
                if (heading) {
                    var elem = angular.element(element[0].querySelector('[uib-accordion-header]'));
                    elem.html('');
                    elem.append(heading);
                }
            });
            
        }
    };
});