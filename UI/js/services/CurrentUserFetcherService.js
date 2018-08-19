var CurrentUserFetcherService = angular.module('CurrentUserFetcherService', ['ngResource']);

CurrentUserFetcherService.factory('CurrentUserFetcher', ['$resource', function ($resource) {
    return $resource('api/CurrentUser', {}, {
        query: { isArray: false }
    });
}]);
