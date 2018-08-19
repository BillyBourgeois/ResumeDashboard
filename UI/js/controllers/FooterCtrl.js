'use strict';
Controllers.controller('FooterCtrl', [
    '$scope', '$route', '$rootScope', 'Cache',
    function (
        $scope, $route, $rootScope, Cache) {
       
        $scope.build = 'alpha';

        var theme = Cache.get('theme') != undefined ? Cache.get('theme') : 'Default' ;
        
        $scope.themes = [
            { name: 'Default', path: 'Content/Themes/default.css', selected: theme == 'Default' },
            { name: 'Plain', path: 'Content/Themes/plain.css', selected: theme == 'Default' },
            { name: 'Cyborg', path: 'Content/Themes/cyborg.css', selected: theme == 'Cyborg' },
            { name: 'Sandstone', path: 'Content/Themes/Sandstone.css', selected: theme == 'Sandstone' },
            { name: 'Flat', path: 'Content/Themes/flatly.css', selected: theme == 'Flat' },
            { name: 'Simple', path: 'Content/Themes/simplex.css', selected: theme == 'Simple' },
            { name: 'Slate', path: 'Content/Themes/slate.css', selected: theme == 'Slate' },
            { name: 'Super Hero', path: 'Content/Themes/superHero.css', selected: theme == 'Super Hero' },
        ];

        $scope.selectedTheme = function () {
            return $scope.themes.filter(function (theme) {
                return theme.selected;
            })[0];
        }
        $scope.selectTheme = function (selectedtheme) {            
            $scope.selectedTheme().selected = false;
            selectedtheme.selected = true;
            var theme = Cache.update('theme', selectedtheme.name);
        };
    }    
]);