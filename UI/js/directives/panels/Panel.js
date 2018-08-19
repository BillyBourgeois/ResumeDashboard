Directives.directive("panel", ['BoardService', 'Dialog', '$log', 'Cache', function (BoardService, Dialog, $log, Cache) {
    return {
        templateUrl: 'views/templates/panels/panel.html',
        scope: {
            userId: '=',
            board: '=',
            column: '=',
            panel: '=',
        },
        link: function (scope, element, attrs, ctrl, transclude) {            
            scope.collapsePanel = function collapsePanel(column, panel) {
                BoardService.collapsePanel(scope.board, column, panel);
                Cache.update('board', scope.board);
            };
            scope.removePanel = function removePanel(column, panel) {
                BoardService.removePanel(scope.board, column, panel, function (id) {
                    Cache.update('board', scope.board);
                });
            };
            scope.openRenameDialog = function openRenameDialog(event) {
                event.stopPropagation();
                Dialog.input('Rename Panel',
                        'Please enter a new title for the panel.',
                        30,
                        '',
                        true,
                        'Name (required)',
                        function (title) {
                            scope.panel.title = title;
                            Cache.update('board', scope.board);                           
                        },
                        function () {
                            //do nothing 
                        }, scope.panel.title);
            };
            scope.itemScope = scope.$parent.itemScope;
        }
    }
}]);