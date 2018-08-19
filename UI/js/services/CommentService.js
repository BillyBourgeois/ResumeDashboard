DataServices.factory('Comment', ['$resource', 'API', function ($resource, API) {
    var baseUrl = API.baseUrl + 'Comments';
    return $resource(baseUrl, {}, {
        query: { isArray: false },
        get: { url: baseUrl + "(:id)", isArray: false },
        getChildren: { method: 'GET', url: baseUrl + '(:id)/Children', isArray: false },
        getParent: { method: 'GET', url: baseUrl + '(:id)/Parent', isArray: false },
        post: { method: 'POST', headers: { 'Prefer': 'return=representation' } },
    });
}]);