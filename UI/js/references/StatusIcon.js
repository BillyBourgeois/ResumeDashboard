'use strict';

Controllers.directive('statusIcon', ['StatusLookups', function (StatusLookups) {
    return {
        restrict: 'E',
        require: 'ngModel',
        scope: {
            ngModel: '='
        },
        template: '<span uib-tooltip=\'{{ngModel | status}}\' tooltip-append-to-body="true">\
                        <svg id="svgIcon" class="icon-md pointer">\
                                <use xlink:href="" ng-attr-xlink:href="{{\'Content/svgIcons/icons.svg#\' + svg_Id}}" />\
                        </svg>\
                        <span class="icon-md-spacer"></span>\
                    </span>',
        link: function (scope, element) {
            scope.status = StatusLookups.states();
            

            scope.getSvgId = function getSvgId(statusId) {
                var svg_Id = '';
                switch (parseInt(statusId)) {
                    case scope.status.Draft:
                        svg_Id = 'draft';
                        break;
                    case scope.status.Pending:
                        svg_Id = 'pending';
                        break;
                    case scope.status.InProgress:
                        svg_Id = 'inProgress';
                        break;
                    case scope.status.Complete:
                        svg_Id = 'complete';
                        break;
                    case scope.status.Rework:
                        svg_Id = 'rework';
                        break;
                    case scope.status.Withdrawn:
                        svg_Id = 'withdrawn';
                        break;
                    case scope.status.Declined:
                        svg_Id = 'declined';
                        break;
                    case scope.status.Unreachable:
                        svg_Id = 'unreachable';
                        break;

                };
                return svg_Id;
            };
            scope.svg_Id = scope.getSvgId(scope.ngModel);
            scope.$watch('ngModel', function (newVal, oldVal) {
                if (newVal != oldVal) {
                    scope.svg_Id = scope.getSvgId(newVal);
                    var svgIcon = element.find('#svgIcon');
                    svgIcon.replaceWith('<svg id="svgIcon" class="icon-md pointer">\
                                              <use xlink:href="Content/svgIcons/icons.svg#' + scope.svg_Id + '" />\
                                         </svg>');
                }
            });
        }
    }
}]);