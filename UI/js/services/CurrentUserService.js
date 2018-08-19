var currentUser = {};
DataServices.provider('CurrentUser', [function () {
    return {
        config: function () {

            var initData = load('/api/Users/CurrentUser');
            if (!angular.isDefined(initData.status)) {
                currentUser = initData;
            }
            else {
                currentUser = { firstName: 'Unknown User' };
                window.location("index.html#/error/" + initData.status);
            }
            return currentUser;
        },
        $get: ['User', 'Hub', '$route', '$rootScope',
            function (User, Hub, $route, $rootScope) {
                var hub = Hub;
                var me = this;
                Hub.on('favoriteAssignments', function (favoriteAssignments) {
                    currentUser.favoriteAssignments = favoriteAssignments;
                    $rootScope.$emit('favoriteAssignments_Updated');
                });
                Hub.on('favoriteTasks', function (favoriteTasks) {
                    currentUser.favoriteTasks = favoriteTasks;
                    $rootScope.$emit('favoriteTasks_Updated');
                });
                Hub.on('favoriteTaskTemplates', function (favoriteTaskTemplates) {
                    currentUser.favoriteTaskTemplates = favoriteTaskTemplates;
                    $rootScope.$emit('favoriteTaskTemplates_Updated');
                });

                Hub.on('actAsUsers', function (actAsUsers) {
                    currentUser.actAsUsers = actAsUsers;
                    $rootScope.$emit('actAsUsers_Updated');

                });
                Hub.on('activeAssignments', function (actAsUsers) {
                    $rootScope.$emit('activeAssignments_Updated');
                });
                Hub.on('usersProjects', function (usersProjects) {
                    currentUser.projects = usersProjects;
                    $rootScope.$emit('usersProjects_Updated');
                });
                Hub.on('usersGroups', function (usersGroups) {
                    currentUser.groups = usersGroups;
                    $rootScope.$emit('usersGroups_Updated');
                });
                Hub.on('actingAs_Id', function (actingAs_Id) {
                    User.currentUser({
                    }, function (data) {
                        currentUser = data;
                        addFavoriteTaskIds();
                        addFavoriteAssignmentIds();
                        addFavoriteTaskTemplateIds();
                        $rootScope.$emit('actingAs_Id_Update');
                        if (reload) {
                            $route.reload();
                        }
                    });
                });
                //Hub.on('subscribedTaskUpdated', function (taskId) {
                //    $rootScope.$emit('subscribedTaskUpdated');
                //});
                var addFavoriteTaskIds = function addFavoriteTaskIds() {
                    currentUser.favoriteTaskIds = new Array();
                    angular.forEach(currentUser.favoriteTasks, function (task) {
                        currentUser.favoriteTaskIds.push(task.id);
                    });
                };
                var addFavoriteAssignmentIds = function addFavoriteAssignmentIds() {
                    currentUser.favoriteAssignmentIds = new Array();
                    angular.forEach(currentUser.favoriteAssignments, function (assignment) {
                        currentUser.favoriteAssignmentIds.push(assignment.id);
                    });
                };
                var addFavoriteTaskTemplateIds = function addFavoriteTaskTemplateIds() {
                    currentUser.favoriteTaskTemplateIds = new Array();
                    angular.forEach(currentUser.favoriteTaskTemplates, function (taskTemplates) {
                        currentUser.favoriteTaskTemplateIds.push(taskTemplates.id);
                    });
                };

                return {
                    get: function () {
                        addFavoriteTaskIds();
                        addFavoriteAssignmentIds();
                        addFavoriteTaskTemplateIds();
                        return currentUser;
                    },
                    subscribe: function (scope, eventName, callback) {
                        var handler = $rootScope.$on(eventName, callback);
                        scope.$on('$destroy', handler);
                    },
                    notify: function (eventName) {
                        $rootScope.$emit(eventName);
                    },
                    refresh: function (callBack) {
                        User.currentUser({
                        }, function (data) {
                            currentUser = data;
                            addFavoriteTaskIds();
                            addFavoriteAssignmentIds();
                            addFavoriteTaskTemplateIds();
                            if (callBack !== undefined) {
                                callBack(currentUser);
                            }
                        });
                    },
                    addFavoriteTask: function (task) {
                        currentUser.favoriteTasks.push(task);
                    },
                    removeFavoriteTask: function (task) {
                        for (var i = 0; i < currentUser.favoriteTasks.length; i++) {
                            if (currentUser.favoriteTasks[i].id === task.id) {
                                currentUser.favoriteTasks.splice(i, 1);
                                break;
                            }
                        }
                    },
                    addFavoriteAssignment: function (assignment) {
                        currentUser.favoriteAssignments.push(assignment);
                    },
                    removeFavoriteAssignment: function (assignment) {
                        for (var i = 0; i < currentUser.favoriteAssignments.length; i++) {
                            if (currentUser.favoriteAssignments[i].id === assignment.id) {
                                currentUser.favoriteAssignments.splice(i, 1);
                                break;
                            }
                        }
                    },
                    addFavoriteTaskTemplate: function (template) {
                        currentUser.favoriteTaskTemplates.push(template);
                    },
                    removeFavoriteTaskTemplate: function (template) {
                        for (var i = 0; i < currentUser.favoriteTaskTemplates.length; i++) {
                            if (currentUser.favoriteTaskTemplates[i].id === template.id) {
                                currentUser.favoriteTaskTemplates.splice(i, 1);
                                break;
                            }
                        }
                    },
                    activeUser: function () {
                        var activeUser = currentUser.actingAs !== null ? currentUser.actingAs : currentUser;
                        return activeUser;
                    },
                    subscribeToTask: function (scope, taskId, callback) {
                        Hub.invoke('SubscribeToTask', [taskId])

                        var handler = Hub.on('subscribedTaskUpdated', function (taskId) {
                            callback(taskId);
                        });
                        scope.$on('$destroy', function () {
                            Hub.invoke('unsubscribeFromTask', [taskId]);
                            Hub.off('subscribedTaskUpdated');
                        });
                    },

                    unsubscribeFromTask: function (taskId) {
                        Hub.invoke('unsubscribeFromTask', [taskId]);
                    },
                };
            }]
    };
}]);