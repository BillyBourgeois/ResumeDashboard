'use strict';
//board models
function Board(name, numberOfColumns) {
    return {
        name: name,
        numberOfColumns: numberOfColumns,
        columns: new Array()
    };
}

function Column(index) {
    return {
        index: index,
        panels: new Array()
    };
}

function Panel(title, open, templateUrl, type, data, id, position) {
    this.title = title;
    this.open = open;
    this.templateUrl = templateUrl;
    this.type = type;
    this.data = data;
    this.id = id;
    this.position = position
    return this;
}

BoardServices.factory('BoardManipulator', function () {
    return {
        addColumn: function (board, columnName) {
            board.columns.push(new Column(columnName));
        },
        addPanelToColumn: function (board, columnIndex, panelTitle, open, templateUrl, type, data, id) {
            var d = null;
            if (angular.isDefined(data)) {
                d = JSON.parse(data);
            }
            board.columns[columnIndex].panels.push(new Panel(panelTitle, open, templateUrl, type, d, id));
        },
        removePanelFromColumn: function (board, columnIndex, panel) {
            board.columns[columnIndex].panels.splice(board.columns[columnIndex].panels.indexOf(panel), 1);
        },
    };
});


BoardServices.service('BoardService', ['$uibModal', 'BoardManipulator', function ($uibModal, BoardManipulator) {

    return {
        addPanel: function (board, column, panel, callback) {
            BoardManipulator.addPanelToColumn(board, 0, panel.title, panel.open, null, panel.type, null, panel.id);
            if (angular.isDefined(callback)) {
                callback(panel);
            }
        },
        removePanel: function (board, column, panel, callback) {
            BoardManipulator.removePanelFromColumn(board, column.index, panel);
            if (angular.isDefined(callback)) {
                callback(panel.id);
            }
        },
        collapsePanel: function (board, column, panel) {
            panel.open = !panel.open;
        },
        deserializeBoard: function (board, scope) {
            var homeBoard = new Board(board.name, board.numberOfColumns);
            for (var i = 0; i < 4; i++) {
                BoardManipulator.addColumn(homeBoard, i);
                var columnPanels = board.panels.filter(function (panel) { return panel.column == i });
                var sortedColumnPanels = columnPanels.sort(function (a, b) { return a.position - b.position });
                angular.forEach(sortedColumnPanels, function (panel) {
                    BoardManipulator.addPanelToColumn(homeBoard, i, panel.title, panel.open, null, panel.type, panel.data, panel.id);
                });
            }
            return homeBoard;
        },
        createNewBoard: function () {
            var board = new Board('MyBoard', 3);

            //left col
            var contactPanel = new Panel('Contact Info', true, '', 'contactInfo', null, 1, 0);
            var skillsPanel = new Panel('Skills', true, '', 'skills', null, 2, 1);
            //center col
            var jobsPanel = new Panel('Work History', true, '', 'jobs', null, 3, 0);
            var degreesPanel = new Panel('Education', true, '', 'degrees', null, 4, 1);
            //right col
            var hobbiesPanel = new Panel('Hobbies', true, '', 'hobbies', null, 6, 1);
           

            var col0 = new Column(0);
            col0.panels.push(contactPanel);
            col0.panels.push(skillsPanel);
            var col1 = new Column(1);
            col1.panels.push(jobsPanel);
            col1.panels.push(degreesPanel)
            var col2 = new Column(2);
            col2.panels.push(hobbiesPanel);
            var col3 = new Column(3);
            board.columns.push(col0);
            board.columns.push(col1);
            board.columns.push(col2);
            board.columns.push(col3);

            return board;

        }
    };
}]);