'use strict';

var queryBuilder = angular.module('queryBuilder', []);
queryBuilder.directive('queryBuilder', ['$compile', 'API', '$filter', 'ProjectLookups', 'GroupLookups', 'UserLookups', 'StatusLookups',
    function ($compile, API, $filter, ProjectLookups, GroupLookups, UserLookups, StatusLookups) {
        return {
            restrict: 'E',
            scope: {
                group: '=?',
                filter: '=?'
            },
            templateUrl: 'views/templates/query-builder.html',
            link: function (scope, element) {
                scope.operators = [
                    { name: 'AND' },
                    { name: 'OR' }
                ];

                scope.projects = ProjectLookups.get();
                scope.groups = GroupLookups.get();
                scope.users = UserLookups.get();
                scope.statuses = StatusLookups.get();

                scope.queryTypes = [{
                    name: 'Tasks',
                    selected: true,
                    fields: [
                        { name: 'Id', display: 'Id', type: 'int', nullable: false },                        
                        { name: 'Title', display: 'Title', type: 'string', nullable: true },
                        { name: 'Created', display: 'Created', type: 'date', nullable: false },
                        { name: 'Description', display: 'Description', type: 'string', nullable: true },
                        { name: 'TaskNumber', display: 'Task Number', type: 'string', nullable: true },
                        { name: 'ActivatedDate', display: 'Activated Date', type: 'date', nullable: true },
                        { name: 'DueDate', display: 'Due Date', type: 'date', nullable: true },
                        { name: 'LastUpdated', display: 'Last Updated', type: 'date', nullable: false },
                        { name: 'Project_Id', display: 'Project', type: 'project', nullable: false },
                        { name: 'Status_Id', display: 'Status', type: 'status', nullable: false },
                        { name: 'Owner_Id', display: 'Owner', type: 'user', nullable: false },
                        //{ name: 'ParentAssignment_Id', display: 'Parent Assignment', type: 'int', nullable: true },
                        //{ name: 'ParentTask_Id', display: 'Parent Task', type: 'int', nullable: true },
                    ]
                },
                {
                    name: 'Assignments',
                    selected: false,
                    fields: [
                        { name: 'Id', display: 'Id', type: 'int', nullable: false },
                        { name: 'Comment', display: 'Comment', type: 'string', nullable: true },
                        { name: 'Complete', display: 'Complete', type: 'date', nullable: true },
                        { name: 'Status.Id', display: 'Status', type: 'status', nullable: false },
                        { name: 'Decision.Id', display: 'Decision', type: 'int', nullable: true },
                        { name: 'Task/TaskNumber', display: 'Task Number', type: 'string', nullable: true },
                        { name: 'CompletedBy', display: 'Completed By', type: 'user', nullable: true },
                        { name: 'Group_Id', display: 'Group', type: 'group', nullable: true },
                        { name: 'User_Id', display: 'User', type: 'user', nullable: true },
                        { name: 'Task/Project/Id', display: 'Project', type: 'project', nullable: false },
                    ]
                },
                 {
                     name: 'User',
                     selected: false,
                     fields: [
                         { name: 'FirstName', display: 'First Name', type: 'string', nullable: false },
                         { name: 'LastName', display: 'Last Name', type: 'string', nullable: false },
                         { name: 'Email', display: 'Email', type: 'string', nullable: true },
                         { name: 'Inactive', display: 'Inactive', type: 'bool', nullable: false },
                         { name: 'ActingAs_Id', display: 'Acting As', type: 'user', nullable: true },
                         { name: 'DefaultProject_Id', display: 'Default Project', type: 'project', nullable: false },                        
                     ]
                 }
                ];

                if (angular.isDefined(scope.$parent.queryType)) {
                    scope.queryType = scope.queryTypes.filter(function (queryType) {
                        return queryType.name == scope.$parent.queryType.name;
                    })[0];
                    scope.isBase = false;
                }
                else {
                    scope.queryType = scope.queryTypes[0];
                    scope.isBase = true;
                }

                scope.dateConditions = [
                    { name: 'Equals', input: 'date' },
                    { name: 'Not Equals', input: 'date' },
                    { name: 'Less Than', input: 'date' },
                    { name: 'Less Than or Equal', input: 'date' },
                    { name: 'Greater Than', input: 'date' },
                    { name: 'Greater Than or Equal', input: 'date' },
                ];

                scope.stringConditions = [
                    { name: 'Equals', input: 'text' },
                    { name: 'Not Equals', input: 'text' },
                    { name: 'Contains', input: 'text' },
                    { name: 'Starts With', input: 'text' },
                    { name: 'Ends With', input: 'text' }
                ];

                scope.boolConditions = [
                    { name: 'is True', input: false },
                    { name: 'is False', input: false }
                ];

                scope.intConditions = [
                    { name: 'Equals', input: 'int' },
                    { name: 'Not Equals', input: 'int' },
                    { name: 'Less Than', input: 'int' },
                    { name: 'Less Than or Equal', input: 'int' },
                    { name: 'Greater Than', input: 'int' },
                    { name: 'Greater Than or Equal', input: 'int' },
                ];

                scope.intConditions = [
                    { name: 'Equals', input: 'int' },
                    { name: 'Not Equals', input: 'int' },
                    { name: 'Less Than', input: 'int' },
                    { name: 'Less Than or Equal', input: 'int' },
                    { name: 'Greater Than', input: 'int' },
                    { name: 'Greater Than or Equal', input: 'int' },
                ];
                scope.nullableConditions = [
                    { name: 'is Null', input: false },
                    { name: 'is Not Null', input: false },
                ];

                scope.projectConditions = [
                    { name: 'From', input: 'project' },
                    { name: 'Not From', input: 'project' },
                ];

                scope.groupConditions = [
                    { name: 'Assigned To', input: 'group' },
                    { name: 'Not Assigned To', input: 'group' },
                ];
                scope.userConditions = [
                    { name: 'Is', input: 'user' },
                    { name: 'Is Not', input: 'user' },
                ];

                scope.statusConditions = [
                    { name: 'In', input: 'status' },
                    { name: 'Not In', input: 'status' },
                ];

                scope.getConditions = function getConditions(field) {
                    var conditions = new Array();

                    if (angular.isDefined(field) && field != null) {
                        if (field.nullable) {
                            conditions = conditions.concat(scope.nullableConditions)
                        }
                        switch (field.type) {
                            case 'int':
                                conditions = conditions.concat(scope.intConditions);
                                break;
                            case 'bool':
                                conditions = conditions.concat(scope.boolConditions);
                                break;
                            case 'string':
                                conditions = conditions.concat(scope.stringConditions);
                                break;
                            case 'date':
                                conditions = conditions.concat(scope.dateConditions);
                                break;
                            case 'project':
                                conditions = conditions.concat(scope.projectConditions);
                                break;
                            case 'group':
                                conditions = conditions.concat(scope.groupConditions)
                                break;
                            case 'user':
                                conditions = conditions.concat(scope.userConditions)
                                break;
                            case 'status':
                                conditions = conditions.concat(scope.statusConditions)
                                break;
                            default:
                                conditions = conditions;
                        };
                    }
                    return conditions
                };
                scope.fullNameCompare = function fullNameCompare(searchTerm) {
                    return function (item) {
                        var fullName = item.lastName + ', ' + item.firstName;
                        return fullName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
                    };
                };
                scope.filter = angular.isDefined(scope.filter) ? scope.filter : '';
                scope.query = new ODataFilterBuilder();
                scope.group = {
                    operator: scope.operators[0],
                    condition: null,
                    field: null,
                    rules: new Array()
                };
                //if (scope.filter != '') {


                //    scope.group.rules.push({
                //        condition: scope.intConditions[0],
                //        field: scope.queryTypes[0].fields[0],
                //        data: 1
                //    });
                //}
                //else {

                //}

                scope.clearQuery = function clearQuery() {
                    scope.group = {
                        operator: scope.operators[0],
                        condition: null,
                        field: null,
                        rules: new Array()
                    };
                };

                scope.addCondition = function () {
                    scope.group.rules.push({
                        condition: null,
                        field: null,
                        data: ''
                    });
                };

                scope.removeCondition = function (index) {
                    scope.group.rules.splice(index, 1);
                };

                scope.addGroup = function () {
                    scope.group.rules.push({
                        group: {
                            operator: scope.operators[0],
                            rules: new Array()
                        }
                    });
                };

                scope.removeGroup = function () {
                    "group" in scope.$parent && scope.$parent.group.rules.splice(scope.$parent.$index, 1);
                };

                scope.buildUrl = function buildUrl() {
                    var filter = scope.buildQuery(scope.group)
                    scope.query
                    scope.filter = scope.query.toString();
                    scope.queryUrl = API.baseUrl + scope.queryType.name + '?$filter=' + filter;
                };

                scope.buildQuery = function buildQuery(group) {
                    if (group.rules.length > 0) {
                        var query = new ODataFilterBuilder(group.operator.name)
                        if (angular.isDefined(group.group)) {

                            query = scope.buildQuery(group.group);
                        }
                        var orderedRules = $filter('orderBy')(group.rules, '-group');
                        angular.forEach(orderedRules, function (rule) {
                            if (angular.isDefined(rule.group)) {

                                var subQuery = scope.buildQuery(rule.group);
                                if (group.operator.name == 'AND') {
                                    query.and(subQuery);
                                }
                                else {
                                    query.or(subQuery);
                                }
                            }
                            else {
                                switch (rule.condition.name) {
                                    case 'Equals':
                                        query.eq(rule.field.name, rule.data);
                                        break;
                                    case 'Not Equals':

                                        if (rule.data instanceof Date) {
                                            query.ne(rule.field.name, rule.data.toTimeOffsetString(), false);
                                        }
                                        else {
                                            query.ne(rule.field.name, rule.data);
                                        }
                                        break;
                                    case 'Less Than':
                                        if (rule.data instanceof Date) {
                                            query.lt(rule.field.name, rule.data.toTimeOffsetString(), false);
                                        }
                                        else {
                                            query.lt(rule.field.name, rule.data);
                                        }
                                        break;
                                    case 'Less Than or Equal':
                                        if (rule.data instanceof Date) {
                                            query.le(rule.field.name, rule.data.toTimeOffsetString(), false);
                                        }
                                        else {
                                            query.le(rule.field.name, rule.data);
                                        }
                                        break;
                                    case 'Greater Than':
                                        if (rule.data instanceof Date) {
                                            query.gt(rule.field.name, rule.data.toTimeOffsetString(), false);
                                        }
                                        else {
                                            query.gt(rule.field.name, rule.data);
                                        }
                                        break;
                                    case 'Greater Than or Equal':
                                        if (rule.data instanceof Date) {
                                            query.ge(rule.field.name, rule.data.toTimeOffsetString(), false);
                                        }
                                        else {
                                            query.ge(rule.field.name, rule.data);
                                        }
                                        break;
                                    case 'is True':
                                        query.eq(rule.field.name, true);
                                        break;
                                    case 'is False':
                                        query.eq(rule.field.name, false);
                                        break;
                                    case 'is Null':
                                        query.eq(rule.field.name, null);
                                        break;
                                    case 'is Not Null':
                                        query.ne(rule.field.name, null);
                                        break;
                                    case 'Contains':
                                        query.contains(rule.field.name, rule.data);
                                        break;
                                    case 'Starts With':
                                        query.startsWith(rule.field.name, rule.data);
                                        break;
                                    case 'Ends With':
                                        query.endsWith(rule.field.name, rule.data);
                                        break;
                                    case 'From':
                                    case 'Is':
                                    case 'In':
                                        query.eq(rule.field.name, rule.data.id);
                                        break;
                                    case 'Not From':
                                    case 'Is Not':
                                    case 'Not In':
                                        query.ne(rule.field.name, rule.data.id);
                                        break;
                                }
                            }
                        });
                        return query.toString();
                    }
                };
            },
        }
    }]);