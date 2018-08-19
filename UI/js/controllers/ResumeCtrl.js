'use strict';

Controllers.controller('ResumeCtrl', ['$scope', 'BoardService', '$log', 'Cache', '$routeParams',
    function ($scope, BoardService, $log, Cache, $routeParams) {
        $scope.userId = $routeParams.userId;
        $scope.board = Cache.get('board') !== undefined ? Cache.get('board') : BoardService.createNewBoard();
        if (Cache.get('board') !== undefined) {
            $scope.board = Cache.get('board');
        }
        else {
            $scope.board = BoardService.createNewBoard();
            Cache.update('board', $scope.board);
        }

        //determine layout of board depending on how many columns are selected
        $scope.getColumnWidth = function (index) {
            var colClass = '';
            switch (index) {
                case 0:
                    switch ($scope.board.numberOfColumns) {
                        case 1:
                            colClass = 'col-sm-12';
                            break;
                        case 2:
                            colClass = 'col-sm-6';
                            break;
                        case 3:
                            colClass = 'col-sm-3';
                            break;
                        case 4:
                            colClass = 'col-sm-3';
                            break;
                        default:
                            colClass = 'hidden';
                    }
                    break;
                case 1:
                    switch ($scope.board.numberOfColumns) {
                        case 2:
                        case 3:
                            colClass = 'col-sm-6';
                            break;
                        case 4:
                            colClass = 'col-sm-3';
                            break;
                        default:
                            colClass = 'hidden';
                    }
                    break;
                case 2:
                    switch ($scope.board.numberOfColumns) {
                        case 3:
                        case 4:
                            colClass = 'col-sm-3';
                            break;
                        default:
                            colClass = 'hidden';
                    }
                    break;
                case 3:
                    switch ($scope.board.numberOfColumns) {
                        case 4:
                            colClass = 'col-sm-3';
                            break;
                        default:
                            colClass = 'hidden';
                    }
                    break;
                default:
                    colClass = 'hidden';
            }
            return colClass;
        };

        //set up how the board looks and callbacks
        $scope.boardSortOptions = {
            accept: function (sourceItemHandleScope, destSortableScope) {
                return true
            },
            itemMoved: function (event) {
                $scope.onMove(event);
            },
            orderChanged: function (event) {
                $scope.onMove(event);
            },
            containment: '#board',
            clone: false,
            allowDuplicates: false,
        };

        $scope.onMove = function onMove(event) {
            var dest = event.dest;
            var source = event.source;
            Cache.update('board', $scope.board);
        };

        //add a new panel from the selection list
        $scope.addPanel = function addPanel(column, panel) {
            BoardService.addPanel($scope.board, column, panel, function (data) {
                Cache.update('board', $scope.board);
            });
        };

        //save column numbers on change
        $scope.$watch('board.numberOfColumns', function (val, oldVal) {
            if (angular.isDefined($scope.board)) {
                Cache.update('board', $scope.board);
            }
        });

        $scope.availablePanels = [
            { type: 'contactInfo', title: 'Contact Information' },
            { type: 'hobbies', title: 'Hobbies' },
            { type: 'skills', title: 'Skills' },
            { type: 'jobs', title: 'Work History' },
            { type: 'degrees', title: 'Education' },
        ];

        //$scope.whereIdsNotIn = function whereIdsNotIn(excludedArray) {
        //    if (excludedArray !== undefined) {
        //        return function (item) {
        //            return excludedArray.filter(
        //                function (excludedItem) {
        //                    return excludedItem.type == item.type;
        //                }).length == 0;
        //        };
        //    }
        //};

    }

]);