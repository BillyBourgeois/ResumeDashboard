var CacheService = angular.module('Cache', ['ngStorage']);

CacheService.factory('Cache', ['$localStorage', '$window',
    function ($localStorage, $window) {
        var add = function (key, data) {
            $localStorage[key] = JSON.stringify(data);
        }
        var get = function (key) {
            if ($localStorage[key] != undefined) {
                return JSON.parse($localStorage[key]);
            }
            else {
                return undefined;
            }
        }
        var remove = function (thing) {
            $localStorage.things.splice($localStorage.things.indexOf(thing), 1);
        }
        var clear = function () {
            var localStorage = $window.localStorage;
            $localStorage.$reset();
        }
        return {
            add: add,
            update: add,
            get: get,
            remove: remove,
            clear: clear
        };
    }]);