'use strict';

Controllers.controller('ProfileCtrl', ['$scope', '$location', 'CurrentUser', 'User', 'UserDetails',
                        '$routeParams', 'UserLookups', 'toastr', '$timeout', '$log', 'Authorization',
    function ProfileCtrl($scope, $location, CurrentUser, User, UserDetails,
        $routeParams, UserLookups, toastr, $timeout, $log, Authorization) {
        if (new Authorization.new(1, false, false).isAuthorized()) {
            $scope.spin = true;
            $scope.currentUser = CurrentUser.get();
            $scope.user = new User(
                {
                    id: $scope.currentUser.id,
                    firstName: $scope.currentUser.firstName,
                    lastName: $scope.currentUser.lastName,
                    email: $scope.currentUser.email,
                    inactive: $scope.currentUser.inactive,
                    actingAs_Id: $scope.currentUser.actingAs_Id,
                    company_Id: $scope.currentUser.company_Id,
                    defaultProject_Id: $scope.currentUser.defaultProject_Id
                });

            UserDetails.get({ id: $scope.currentUser.id, }, function onSuccess(data) {
                $scope.userDetails = new UserDetails(data);
            }, function onError(data) {
                toastr.error("Could not get the profile. Please try again.", 'Error', { extraData: { error: error } });
                $log.error(error);
            });

            $scope.projects = $scope.currentUser.projects;
            $scope.groups = $scope.currentUser.groups;
            $scope.actAsUsers = $scope.currentUser.actAsUsers;
            $scope.actAsMeUsers = $scope.currentUser.actAsMeUsers;

            $scope.actAsMeIds = new Array();
            angular.forEach($scope.actAsMeUsers, function (user) {
                $scope.actAsMeIds.push(user.id);
            });

            $scope.companyUsers = UserLookups.get();

            $scope.whereIdsNotIn = function whereIdsNotIn(excludedArray) {
                if (excludedArray !== undefined) {
                    return function (item) {
                        return excludedArray.indexOf(item.id) === -1;
                    };
                }
            };
            $scope.inMyCompany = function inMyCompany() {
                return function (item) {
                    if (item.company_Id != null) {
                        return item.company_Id === $scope.currentUser.company_Id;
                    }
                    else {
                        return true;
                    }
                };
            };

            $scope.fullNameCompare = function fullNameCompare(searchTerm) {
                return function (item) {
                    var fullName = item.lastName + ', ' + item.firstName;
                    return fullName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
                };
            };

            $scope.cancel = function cancel() {
                $location.path('/Home');
            };
            $timeout(function () {
                $scope.spin = false;
            }, 500);

            $scope.save = function save() {
                $scope.user.$put({ id: $scope.user.id }, function onSuccess(data) {
                    $scope.userForm.$setPristine();
                    UserLookups.refresh();
                    $scope.user = data;
                    CurrentUser.refresh(function (data) {
                        $scope.currentUser = data;
                    });

                    toastr.success("Profile saved.", 'Save Success');
                },
                    function onError(error) {
                        toastr.error("Profile not saved. Please try again.", 'Save Error', { extraData: { error: error } });
                        $log.error(error);
                    });
            };

            $scope.accordionModel = {
                selectedActAsUser: ''
            };

            $scope.addActAsUser = function (accordionModel) {
                User.addActAsUser({userId: $scope.user.id, actAsUserId: accordionModel.selectedActAsUser.id},                
                    function onSuccess() {
                        $scope.actAsMeUsers.push(accordionModel.selectedActAsUser);
                        $scope.actAsMeIds.push(accordionModel.selectedActAsUser.id);
                        toastr.success(accordionModel.selectedActAsUser.firstName + " can act on my behalf.", 'Save Success');
                        accordionModel.selectedActAsUser = null;
                        CurrentUser.refresh(function (data) {
                            $scope.currentUser = data;
                        });
                    },
                    function onError(data) {
                        toastr.error("The act as settings were not updated. Please try again.", 'Save Error', { extraData: { error: error } });
                        console.log(data);
                    });
            };

            $scope.removeActAsUser = function (user) {
                User.removeActAsUser({userId: $scope.user.id, actAsUserId: user.id}, 
                    function onSuccess() {
                        var indexForactAsMeUserArray = $scope.actAsMeUsers.indexOf(user);
                        var indexForactAsMeUserIdArray = $scope.actAsMeIds.indexOf(user.id);
                        $scope.actAsMeUsers.splice(indexForactAsMeUserArray, 1);
                        $scope.actAsMeIds.splice(indexForactAsMeUserIdArray, 1);

                        CurrentUser.refresh(function (data) {
                            $scope.currentUser = data;
                        });

                        toastr.success(user.firstName + " can no longer act on my behalf.", 'Save Success');
                    },
                    function onError(data) {
                        toastr.error("The act as settings were not updated. Please try again.", 'Save Error', { extraData: { error: error } });
                        console.log(data);
                    });
            };

            $scope.setAsDefaultProject = function setAsDefaultProject(project) {
                var updateDefaultProjectUser = new User(
                    {
                        id: $scope.currentUser.id,
                        firstName: $scope.currentUser.firstName,
                        lastName: $scope.currentUser.lastName,
                        email: $scope.currentUser.email,
                        inactive: $scope.currentUser.inactive,
                        actingAs_Id: $scope.currentUser.actingAs_Id,
                        company_Id: $scope.currentUser.company_Id,
                        defaultProject_Id: project.id
                    });
                
                updateDefaultProjectUser.$put({ id: updateDefaultProjectUser.id }, function onSuccess(data) {
                    CurrentUser.refresh(function (data) {
                        $scope.currentUser = data;
                    });
                    $scope.user.defaultProject_Id = project.id;
                    toastr.success("Profile saved.", 'Save Success');
                },
                   function onError(error) {
                       toastr.error("Profile not saved. Please try again.", 'Save Error', { extraData: { error: error } });
                       $log.error(error);
                   });
            };
        }
    }
]);