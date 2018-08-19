DataServices.factory('User', ['$resource', 'API',
    function ($resource, API) {
        var baseUrl = API.baseUrl + 'Users';
        return $resource(baseUrl, {}, {
            query: { isArray: false },
            get: { isArray: false, params: { id: '@id' }, url: baseUrl + '(:id)' },
            getSkills: { isArray: false, params: { id: '@id' }, url: baseUrl + '(:id)/skills' },
            getHobbies: { isArray: false, params: { id: '@id' }, url: baseUrl + '(:id)/hobbies' },
            getJobs: { isArray: false, params: { id: '@id' }, url: baseUrl + '(:id)/jobs' },
            getDegrees: { isArray: false, params: { id: '@id' }, url: baseUrl + '(:id)/degrees' },
            put: { method: 'PUT', params: { id: '@id' }, url: baseUrl + '(:id)', headers: { 'Prefer': 'return=representation' } },
            post: { method: 'POST', url: baseUrl },
            delete: { method: 'DELETE', params: { id: '@id' }, url: baseUrl + '(:id)' },
        });
    }
]);
