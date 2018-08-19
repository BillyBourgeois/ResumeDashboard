'use strict';
DataServices.factory('Export', ['$filter', function ($filter, StatusLookups) {
    

    //var exportTasks = function exprotTasks(tasks, fileName, filter) {
    //    var now = $filter('date')(new Date(), '_MMddyyyy_HHmmss');
    //    fileName = angular.isDefined(fileName) ? fileName : 'Tasks'+ now;
    //    var flatTasks = flattenTasks(tasks);
    //    exportToCsv(fileName + '.csv', flatTasks, filter);
    //};

    //var flattenTasks = function flattenTasks(tasks) {
    //    var status = StatusLookups.states();
    //    var simpleArray = [];
    //    var headerRow = ['Id', 'Task Number', 'Task Owner', 'Activated'
    //        , 'Due Date', 'Completed', 'Title', 'Project', 'Status'];
    //    simpleArray.push(headerRow);
    //    angular.forEach(tasks, function (item) {
    //        var row = new Array();
    //        row.push(item.id);
    //        if (item.taskNumber != null) {
    //            row.push(item.taskNumber);
    //        }
    //        else {
    //            row.push('Not Assigned');
    //        }
    //        if (item.owner_Id != null) {
    //            row.push($filter('fullName')(item.owner_Id));
    //        }
    //        else {
    //            row.push('Not Assigned');
    //        }

    //        if (item.activatedDate != null) {
    //            row.push($filter('date')(item.activatedDate, 'short'));
    //        }
    //        else {
    //            row.push('Not Assigned');
    //        }

    //        if (item.dueDate != null) {
    //            row.push($filter('date')(item.dueDate, 'short'));
    //        }
    //        else {
    //            row.push('Not Assigned');
    //        }

    //        if (item.lastUpdated != null && item.status_Id == status.Complete) {
    //            row.push($filter('date')(item.completed, 'short'));
    //        }
    //        else {
    //            row.push('Not Assigned');
    //        }
    //        if (item.title != null) {
    //            row.push(item.title);
    //        }
    //        else {
    //            row.push('Not Assigned');
    //        }
    //        if (item.project_Id != null) {
    //            row.push(($filter('project')(item.project_Id)));
    //            //row.push(item.project.name);
    //        }
    //        else {
    //            row.push('Not Assigned');
    //        }
    //        if (item.status_Id != null) {
    //            row.push($filter('status')(item.status_Id));
    //        }
    //        else {
    //            row.push('Not Assigned');
    //        }
    //        simpleArray.push(row);
    //    });
    //    return simpleArray;
    //};
    //var exportAssignment = function exportAssignment(assignments, fileName, filter) {
    //    var now = $filter('date')(new Date(), '_MMddyyyy_HHmmss');
    //    fileName = angular.isDefined(fileName) ? fileName : 'Assignments' + now;
    //    var flatAssignments = flattenAssignments(assignments);
    //    exportToCsv(fileName + '.csv', flatAssignments, filter);
    //};
    //var flattenAssignments = function flattenAssignments(assignments) {
    //    var simpleArray = [];
    //    var headerRow = ['Id', 'Task Number', 'Task Owner', 'Step Name', 'Assignee', 'Group'
    //    , 'Due Date', 'Completed', 'Project', 'Status'];
    //    simpleArray.push(headerRow);
    //    angular.forEach(assignments, function (item) {
    //        var row = new Array();
    //        row.push(item.id);
    //        if (item.task != null && item.task.taskNumber != null) {
    //            row.push(item.task.taskNumber);
    //        }
    //        else {
    //            if (item.task != null && item.task.taskNumber != null) {
    //                row.push(item.task.taskNumber);
    //            }
    //            else {
    //                row.push('Not Assigned');
    //            }
    //        }
    //        if (item.task != null && item.task.owner_Id != null) {
    //            row.push($filter('fullName')(item.task.owner_Id));
    //        }
    //        else {
    //            if (item.task != null && item.task.owner_Id != null) {
    //                row.push($filter('fullName')(item.task.owner_Id));
    //            }
    //            else {
    //                row.push('Not Assigned');
    //            }
    //        }
    //        if (item.vertex != null && item.vertex.name != null) {
    //            row.push(item.vertex.name);
    //        }
    //        else {
    //            row.push('Not Assigned');
    //        }
    //        if (item.user_Id != null) {
    //            row.push($filter('fullName')(item.user_Id));
    //        }
    //        else {
    //            row.push('Not Assigned');
    //        }
    //        if (item.group_Id != null) {
    //            row.push($filter('blank')($filter('group')(item.group_Id)));
    //        }
    //        else {
    //            row.push('Not Assigned');
    //        }

    //        if (item.vertex != null && item.vertex.dueDate != null) {
    //            row.push($filter('date')(item.vertex.dueDate, 'short'));
    //        }
    //        else {
    //            row.push('Not Assigned');
    //        }

    //        if (item.completed != null) {
    //            row.push($filter('date')(item.completed, 'short'));
    //        }
    //        else {
    //            row.push('Not Assigned');
    //        }

    //        if (item.task != null && item.task.project_Id != null) {
    //            row.push(($filter('project')(item.task.project_Id)));
    //            //row.push(item.project.name);
    //        }

    //        else {
    //            row.push('Not Assigned');
    //        }

    //        if (item.status_Id != null) {
    //            row.push($filter('status')(item.status_Id));
    //        }
    //        else {
    //            row.push('Not Assigned');
    //        }
    //        simpleArray.push(row);
    //    });
    //    return (simpleArray);
    //};
    //var exportTemplates = function exportTemplates(templates, fileName, filter) {
    //    var now = $filter('date')(new Date(), '_MMddyyyy_HHmmss');
    //    fileName = angular.isDefined(fileName) ? fileName : 'Tasks' + now;
    //    var flatTasks = flattenTemplates(templates);
    //    exportToCsv(fileName + '.csv', flatTasks, filter);
    //};
    //var flattenTemplates = function flattenTemplates(tasks) {
    //    var simpleArray = [];
    //    var headerRow = ['Id', 'Name', 'Owner', 'Created Date', 'Project', 'Active'];
    //    simpleArray.push(headerRow);
    //    angular.forEach(tasks, function (item) {
    //        var row = new Array();
    //        row.push(item.id);
    //        if (item.templateName != null) {
    //            row.push(item.templateName);
    //        }
    //        else {
    //            row.push('Not Assigned');
    //        }
    //        if (item.owner_Id != null) {
    //            row.push($filter('fullName')(item.owner_Id));
    //        }
    //        else {
    //            row.push('Not Assigned');
    //        }

    //        if (item.created != null) {
    //            row.push($filter('date')(item.created, 'short'));
    //        }
    //        else {
    //            row.push('Not Assigned');
    //        }
    //        if (item.project_Id != null) {
    //            row.push(($filter('project')(item.project_Id)));                
    //        }
    //        else {
    //            row.push('Not Assigned');
    //        }
    //        if (item.inactive != null) {
    //            var activeStr = !item.inactive ? 'Active' : 'Inactive'
    //            row.push(activeStr);
    //        }
    //        else {
    //            row.push('Not Assigned');
    //        }
    //        simpleArray.push(row);
    //    });
    //    return simpleArray;
    //};
    var exportToCsv = function exportToCsv(filename, rows, filter) {
        var processRow = function (row) {
            var finalVal = '';
            for (var j = 0; j < row.length; j++) {
                var innerValue = row[j] === null ? '' : row[j].toString();
                if (row[j] instanceof Date) {
                    innerValue = row[j].toLocaleString();
                };
                var result = innerValue.replace(/"/g, '""');
                if (result.search(/("|,|\n)/g) >= 0)
                    result = '"' + result + '"';
                if (j > 0)
                    finalVal += ',';
                finalVal += result;
            }
            return finalVal + '\n';
        };

        var csvFile = '';
        for (var i = 0; i < rows.length; i++) {
            csvFile += processRow(rows[i]);
        }

        if (filter != null && filter != undefined && filter != '') {
            /*add blank rows*/
            for (var i = 0; i < 3; i++) {
                csvFile += processRow('');
            }
            /*add filter*/
            csvFile += processRow(['Filter:', filter]);
        }

        /*add blank rows*/
        for (var i = 0; i < 3; i++) {
            csvFile += processRow('');
        }
        /*add dateTime Stamp*/
        csvFile += processRow(['Generated:', $filter('date')(new Date(), 'short')]);



        var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, filename);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }
    return {
        skills: function () { },
        hobbies: function () { },
        contactInfo: function () { }
    };
}]);

