'use strict';
ESTARSCtrls.directive('tasksTable', ['CurrentUser', 'toastr', '$location', 'ProjectLookups', 'Export',
    '$filter', '$log', 'ODataFilterBuilder', 'StatusLookups', 'User', 'API',
    function (CurrentUser, toastr, $location, ProjectLookups, Export,
        $filter, $log, ODataFilterBuilder, StatusLookups, User, API) {
        return {
            restrict: 'E',
            require: '^ngModel',
            scope: {
                ngModel: '=',
                width: '@?',
                taskId: '=',
                assignmentId: '=',
                currentUser: '=',
                onFavoriteAdded: '=?',
                onFavoriteRemoved: '=?',
                refresh: '=?',

                fileName: '@?',
                perPage: '=?',
                hideFavorite: '=?',
                hideId: '=?',
                hideNumber: '=?',
                hideOwner: '=?',
                hideActivated: '=?',
                hideDuedate: '=?',
                hideCompleted: '=?',
                hideTitle: '=?',
                hideProject: '=?',
                hideStatus: '=?',
                hidePrint: '=?',
            },
            templateUrl: 'views/templates/tasks-table.html',
            link: function (scope, elem, attrs, ctrl) {
                scope.spin = true;
                scope.activeUser = CurrentUser.activeUser();
                scope.$watch('ngModel', function (val) {
                    if (val) {
                        scope.spin = false;
                    }
                    else {
                        scope.spin = true;
                    }
                });
                scope.showRefresh = function showRefresh() {
                    if (angular.isDefined(scope.refresh)) {
                        return true;
                    }
                    else {
                        return false;
                    }
                };

                scope.taskOwner = function taskOwner(task) {
                    var owner = task !== undefined && scope.activeUser.id === task.owner_Id;
                    return owner;
                };

                scope.width = scope.width != undefined ? scope.width : 'lg';
                scope.taskOrder = 'taskNumber';
                scope.taskOrderReverse = false;

                scope.projectFilter = {
                    property: 'project_Id',
                    items: []
                };
                var projectsArray = new Array();
                scope.projects = angular.forEach(ProjectLookups.get(), function (project) {
                    var index = projectsArray.indexOf(project.name);
                    if (index == -1) {
                        projectsArray.push(project.name);
                        scope.projectFilter.items.push(new filterItem(project.name, true, project.id,
                            function count() {
                                var count = !angular.isDefined(scope.filtered) ? -1 : scope.filtered.filter(function (item) {
                                    return item.project_Id == project.id
                                }).length;
                                return count;
                            },
                            function total() {
                                var total = !angular.isDefined(scope.ngModel) ? -1 : scope.ngModel.filter(function (item) {
                                    return item.project_Id == project.id
                                }).length;
                                return total;
                            }))
                    }
                });
                scope.statusFilter = {
                    property: 'status_Id',
                    items: []
                };
                var statusesArray = new Array();
                scope.projects = angular.forEach(StatusLookups.get(), function (status) {
                    var index = statusesArray.indexOf(status.name);
                    if (index == -1) {
                        statusesArray.push(status.name);
                        scope.statusFilter.items.push(new filterItem(status.name, true, status.id,
                            function count() {
                                var count = !angular.isDefined(scope.filtered) ? -1 : scope.filtered.filter(function (item) {
                                    return item.status_Id == status.id
                                }).length;
                                return count;
                            }, function total() {
                                var total = !angular.isDefined(scope.ngModel) ? -1 : scope.ngModel.filter(function (item) {
                                    return item.status_Id == status.id
                                }).length;
                                return total;
                            })
                        )
                    }
                });
                scope.setPerPage = function setPerPage(newPerPage) {
                    scope.perPage = newPerPage;
                };
                scope.favoriteFilter = {
                    property: 'id | favorite : "task"',
                    items: [
                        new filterItem("Watched", true, true,
                            function count() {
                                var count = !angular.isDefined(scope.filtered) ? -1 : scope.filtered.filter(function (item) {
                                    return $filter('favorite')(item.id, "task") == true;
                                }).length;
                                return count;
                            }, function total() {
                                var total = !angular.isDefined(scope.ngModel) ? -1 : scope.ngModel.filter(function (item) {
                                    return $filter('favorite')(item.id, "task") == true;
                                }).length;
                                return total;
                            }),
                        new filterItem("Not Watched", true, false,
                            function count() {
                                var count = !angular.isDefined(scope.filtered) ? -1 : scope.filtered.filter(function (item) {
                                    return $filter('favorite')(item.id, "task") == false;
                                }).length;
                                return count;
                            },
                            function total() {
                                var total = !angular.isDefined(scope.ngModel) ? -1 : scope.ngModel.filter(function (item) {
                                    return $filter('favorite')(item.id, "task") == false;
                                }).length;
                                return total;
                            }), ]
                };

                scope.titleFilter = {
                    property: 'title',
                    items: []
                };

                scope.taskNumberFilter = {
                    property: 'taskNumber',
                    items: []
                };

                scope.taskIdFilter = {
                    property: 'id',
                    range: ''
                };

                scope.taskOwnerFilter = {
                    property: 'owner_Id | fullName',
                    items: []
                };
                scope.taskDueDateFilter = {
                    property: 'dueDate',
                    minDate: null,
                    maxDate: null,
                    startDate: null,
                    endDate: null,
                    clauseBuilder: null
                };
                scope.taskActivatedFilter = {
                    property: 'activatedDate',
                    minDate: null,
                    maxDate: null,
                    startDate: null,
                    endDate: null,
                    clauseBuilder: null
                };
                scope.taskCompletedFilter = {
                    property: 'completed',
                    minDate: null,
                    maxDate: null,
                    startDate: null,
                    endDate: null,
                    clauseBuilder: null
                }
                scope.fileName = angular.isDefined(scope.fileName) ? scope.fileName : 'Tasks';
                scope.perPage = angular.isDefined(scope.perPage) ? scope.perPage : 20;
                scope.currentPage = 1;

                scope.view = function view(task) {
                    if ((scope.taskOwner(task) && scope.activeUser.userDetails.visibility == 1) || scope.activeUser.userDetails.visibility > 1) {
                        $location.path('/editTask/' + task.id);
                    }
                };

                scope.isFavorite = function isFavorite(taskId) {
                    scope.currentUser = CurrentUser.get();
                    return scope.currentUser.favoriteTaskIds.indexOf(taskId) > -1;
                };

                scope.toggleFavorite = function toggleFavorite(task) {
                    if (!scope.isFavorite(task.id)) {
                        User.addFavoriteTask({ userId: scope.currentUser.id, taskId: task.id },
                            function onSuccess(data) {
                                CurrentUser.addFavoriteTask(task);
                                scope.currentUser = CurrentUser.get();
                                toastr.success("Task: " + task.id + " has been added to your favorites.", 'Save Success');
                                if (angular.isDefined(scope.onFavoriteAdded)) {
                                    scope.onFavoriteAdded(task);
                                }
                            },
                            function onError(error) {
                                CurrentUser.refresh(function (data) {
                                    scope.currentUser = data;
                                    if (!scope.isFavorite(task.id)) {
                                        toastr.error("Your favorites have not been updated", 'Save Error', { extraData: { error: error } });
                                        $log.error(error);
                                    }
                                    else {
                                        if (angular.isDefined(scope.onFavoriteAdded)) {
                                            scope.onFavoriteAdded(task);
                                        }
                                        toastr.success("Task: " + task.id + " has been added to your favorites.", 'Save Success');
                                    }
                                });
                            });
                    }
                    else {
                        User.removeFavoriteTask({ userId: scope.currentUser.id, taskId: task.id },
                           function onSuccess(data) {
                               CurrentUser.removeFavoriteTask(task);
                               scope.currentUser = CurrentUser.get();
                               toastr.success("Task: " + task.id + " has been removed to your favorites.", 'Save Success');
                               if (angular.isDefined(scope.onFavoriteRemoved)) {
                                   scope.onFavoriteRemoved(task);
                               }
                           },
                           function onError(error) {
                               CurrentUser.refresh(function (data) {
                                   scope.currentUser = data;
                                   if (scope.isFavorite(task.id)) {
                                       toastr.error("Your favorites have not been updated", 'Save Error', { extraData: { error: error } });
                                       $log.error(error);
                                   }
                                   else {
                                       if (angular.isDefined(scope.onFavoriteRemoved)) {
                                           scope.onFavoriteRemoved(task);
                                       }
                                       toastr.success("Task: " + task.id + " has been removed to your favorites.", 'Save Success');
                                   }
                               });
                           });
                    }
                };
                scope.exportTasks = function exportTasks(tasks, fileName) {
                    var now = $filter('date')(new Date(), '_MMddyyyy_HHmmss');
                    var filter = odataToString(scope.buildFilter(), 'tasks');
                    Export.tasks(tasks, fileName + now, filter);
                };

                scope.printUrl = function printUrl(id) {
                    return API.baseUrl + 'Tasks(' + id + ')/pdf';
                };

                scope.buildFilter = function buildFilter() {
                    var filter = new ODataFilterBuilder('and');
                    filter.and(scope.projectFilter.clauseBuilder);
                    filter.and(scope.statusFilter.clauseBuilder);
                    filter.and(scope.titleFilter.clauseBuilder);
                    filter.and(scope.taskNumberFilter.clauseBuilder);
                    filter.and(scope.taskIdFilter.clauseBuilder);

                    filter.and(scope.taskOwnerFilter.clauseBuilder);
                    filter.and(scope.taskDueDateFilter.clauseBuilder);
                    filter.and(scope.taskActivatedFilter.clauseBuilder);
                    filter.and(scope.taskCompletedFilter.clauseBuilder);
                    return filter.toString();
                };
            }
        };
    }]);