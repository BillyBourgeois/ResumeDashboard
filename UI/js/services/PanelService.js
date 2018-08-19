//BoardServices.factory('Panel', ['$resource', 'API',
//    function ($resource, API) {
//        var baseUrl = API.baseUrl + 'Panels';
//        return $resource(baseUrl, {}, {
//            query: { isArray: false },
//            get: { isArray: false, params: { id: '@id' }, url: baseUrl + '(:id)' },
//            post: { method: 'POST', url: baseUrl, headers: { 'Prefer': 'return=representation' } },
//            put: { method: 'PUT', url: baseUrl + "(:id)", headers: { 'Prefer': 'return=representation' } },
//            delete: { method: 'DELETE', url: baseUrl + '(:id)' },
//        });
//    }
//]);
