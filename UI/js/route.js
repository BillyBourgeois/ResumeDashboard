app.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/home', {
            templateUrl: 'views/home.html',
            controller: 'HomeCtrl',
            //reloadOnSearch: false
        }).
        when('/info', {
            templateUrl: 'views/info.html',
            controller: 'InfoCtrl',
            reloadOnSearch: false
        }).
        when('/resume/:userId', {
            templateUrl: 'views/resume.html',
            controller: 'ResumeCtrl'
        }).
        when('/error', {
            templateUrl: 'views/error.html',
            controller: 'ErrorCtrl'
        }).
        when('/error/:code', {
            templateUrl: 'views/error.html',
            controller: 'ErrorCtrl'
        }).
        otherwise({
            redirectTo: 'home',
        });
  }]);